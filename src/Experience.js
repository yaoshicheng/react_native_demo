import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, PanResponder } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { I18n } from './locales/i18n'
import { Experience_ZH, Experience_EN } from './constant'

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center',
  },
  scrollview: {
    marginVertical: 30,
  },
  key: {
     color: 'gold',
     fontWeight: 'bold',
     marginBottom: 5,
     paddingLeft: 30,
     paddingRight: 30,
   },
   company: {
    color: 'deepskyblue'
   },
   value: {
    color: '#666',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: '#ddd',
    textAlign: 'justify'
   },
  text: {
    fontSize: 42,
  },
});

function ExperienceScreen({ navigation }) {
  const InitExperience = I18n.locale === 'en' ? Experience_EN : Experience_ZH;
  const [Experience, setExperience] = React.useState(InitExperience);

  useFocusEffect(
    React.useCallback(() => {
      setExperience(I18n.locale === 'en' ? Experience_EN : Experience_ZH)
    },[I18n.locale])
  );


  const _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => {
          return true;
      },
      onMoveShouldSetPanResponder:  (evt, gestureState) => {
          return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
      },
      onPanResponderMove: (evt, gestureState) => {
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, dy} = gestureState;
        if(Math.abs(dx) > Math.abs(dy)){
          if(dx > 50){
            // right
            navigation.jumpTo('Introduction')
          }else if(Number(dx) < -50){
            // left
            navigation.jumpTo('Works')
          }
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
  });

  return (
     <SafeAreaView style={styles.container}>
       <ScrollView style={styles.scrollview} {..._panResponder.panHandlers}>
      {
        Experience.map(item => {
          const { dateRange, company, detail } = item;
          return (
            <View key={company}>
              <Text style={styles.key}> <Text style={styles.company}>{company}</Text>  {dateRange} </Text>
              <Text style={styles.value}> {detail} </Text>
            </View>
          )
        })
      }
     </ScrollView>
    </SafeAreaView>
  );
}

export default ExperienceScreen