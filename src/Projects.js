import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import { Projects_zh, Projects_en } from './constant';
import { useFocusEffect } from '@react-navigation/native';
import { I18n, localeMessage } from './locales/i18n'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    scrollview: {
//      marginHorizontal: 20,
    },
    key: {
       color: 'dodgerblue',
       fontWeight: 'bold',
       margin: 15,
       paddingLeft: 30
     },
    text: {
      fontSize: 42,
    },
    projectItem: {
      margin: 10,
      borderBottomWidth: 1,
      padding: 20,
      borderBottomColor: '#ddd',
    },
    projectName: {
      color: 'dodgerblue',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    summary: {
      color: '#666',
      textAlign: 'justify'
    }
  });

  function showDetail(detail){
    if(detail){
      Alert.alert(
          localeMessage('global.detail'),
          detail,
        );
    }
  }

  function renderItems(items){
    if(Array.isArray(items)){
      return items.map(item=>{
        const { name = '', summary = '',detail = '', date =  ''} = item;
        return (
          <View style={styles.projectItem} onPress={()=> showDetail(detail)} key={name}>
            {name && (<Text style={styles.projectName} onPress={()=> showDetail(detail)}>{date} {name}</Text>)}
            {summary && (<Text style={styles.summary} onPress={()=> showDetail(detail)}>{summary}</Text>)}
          </View>
        )
      })
    }
    return null;
  }


function ProjectsScreen({ navigation }) {

  const InitProjects = I18n.locale === 'en' ? Projects_en : Projects_zh;
  const [Projects, setProjects] = React.useState(InitProjects);

    useFocusEffect(
      React.useCallback(() => {
        setProjects(I18n.locale === 'en' ? Projects_en : Projects_zh)
      },[I18n.locale])
    );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        {renderItems(Projects)}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProjectsScreen