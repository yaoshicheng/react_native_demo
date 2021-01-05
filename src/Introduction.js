import React from 'react';
import { Button, View, Text, Image, StyleSheet, Animated, Easing, PanResponder, Linking } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import ProjectsScreen from './Projects';
import SkillsScreen from './Skills';
import { I18n, localeMessage} from './locales/i18n';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', justifyContent: 'center',
    marginTop: 100,
    marginLeft: 20,
    marginRight: 20,
  },
  avatar: {
    width: 94, height: 114,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  name:{
    fontWeight: 'bold',
    fontSize:  20,
  },
  key: {
    color: 'deepskyblue',
//    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    margin: 7,
    color: '#999'
  },
  uni: {
    fontSize: 16,
    color: 'deepskyblue',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: 'lightsalmon',
    marginBottom: 10
  },
  more: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999
  }
})
function IntroductionScreen({ navigation }) {
  const animation = React.useRef(new Animated.Value(0)).current;
  const animation2 = React.useRef(new Animated.Value(0)).current;
  const [appLocale, setAppLocale] = React.useState(I18n.locale);

  useFocusEffect(
    React.useCallback(() => {
      setAppLocale(I18n.locale)
    },[I18n.locale])
  );

  const animations = {
    opacity: animation,
    rotation: animation2,
  }

  const changeLocale = () => {
    if(I18n.locale === 'zh'){
      setAppLocale('en')
      I18n.locale = 'en'
    } else {
      setAppLocale('zh')
      I18n.locale = 'zh'
    }
  }

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
          navigation.openDrawer()
        }else if(Number(dx) < -50){
          // left
          navigation.jumpTo('Experience')
        }
      }
    },
    onPanResponderTerminate: (evt, gestureState) => {
    },
  });


  useFocusEffect(() => {
     Animated.parallel(['opacity', 'rotation'].map(property => {
        return Animated.timing(animations[property], {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
          easing: Easing.linear
        })
     })).start();
  });


  return (

    <>
     <Icon name='md-earth-outline' style={styles.more} size={30} color='deepskyblue' onPress={changeLocale} />
    <Animated.View
      style={
        [styles.container, {
          opacity: animation,
          transform: [{
             rotateZ: animation2.interpolate({
                 inputRange: [0,1],
                 outputRange: ['0deg', '360deg']
             })
          }]
        }]
      }
      {..._panResponder.panHandlers}
     >
      <Image style={styles.avatar} source={require('../assets/avator.png')} />

      <Text style={styles.name}> {localeMessage('home.introduction.name')} </Text>
      <Text style={styles.info}> {localeMessage('home.introduction.target')} </Text>

      <Text style={styles.info}> {localeMessage('home.introduction.birth')}</Text>
      <Text style={styles.info}> 139-1603-1297</Text>
      <Text style={styles.info}> {localeMessage('home.introduction.address')} </Text>
      <Text style={styles.info}> {localeMessage('home.introduction.email')} </Text>
      <View style={{margin: 10}} />

      {
        I18n.locale === 'zh' ? (
          <>
            <Text style={styles.uni}> {localeMessage('home.introduction.university')}  {localeMessage('home.introduction.major')}</Text>
            <Text style={styles.date}>2012.09 - 2015.04 ({localeMessage('home.introduction.degree1')})</Text>
             <Text style={styles.uni}> {localeMessage('home.introduction.university')}  {localeMessage('home.introduction.major')}</Text>
            <Text style={styles.date}>2008.09 - 2012.06 ({localeMessage('home.introduction.degree2')})</Text>
          </>
        ) : (
          <>
            <Text style={styles.uni}> {localeMessage('home.introduction.university')}</Text>
            <Text style={styles.uni}> {localeMessage('home.introduction.major')}</Text>
            <Text style={styles.date}>2012.09 - 2015.04 ({localeMessage('home.introduction.degree1')})</Text>
            <Text style={styles.uni}> {localeMessage('home.introduction.university')}</Text>
            <Text style={styles.uni}> {localeMessage('home.introduction.major')}</Text>
            <Text style={styles.date}>2008.09 - 2012.06 ({localeMessage('home.introduction.degree2')})</Text>
          </>
        )
      }

    </Animated.View>
    </>
  );
}

export default IntroductionScreen

