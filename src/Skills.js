import React, { useState } from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Echarts from 'native-echarts';

//bar-chart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollview: {
    marginTop: 50
//      marginHorizontal: 20,
  },
  key: {
     color: 'deepskyblue',
     fontWeight: 'bold',
     marginBottom: 5,
     paddingLeft: 30
   },
   value: {
    color: '#666',
    fontWeight: 'bold',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: '#ddd',
   },
  text: {
    fontSize: 42,
  },
  chartIcon: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 999
  }
});

function SkillsScreen({ navigation }) {
  let [iconType, setIconType] = useState('bar-chart');

  const option = {
    title: {
        text: 'Skills Level',
        left: 60,
        show: false
    },
    grid: {
      left: '80'
    },
    color: ['#61a0a8', '#ddd', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3', '#c23531','#2f4554'],
    tooltip: {
      formatter: '{b}:  {c}'
    },
    legend: {
        show: false,
    },
    yAxis: {
        data: ['Basis',"React","Vue","SSR","Applets","Charts","RN", "Packaging", "Tool Library ", "Mock", "SQL", "Other"],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
        },
        inverse: true,
    },
    xAxis: {
      show: false
    },
    series: [
      {
        type: 'bar',
        stack: 'Level',
        barWidth: 15,
        silent: true,
        data: [85, 80, 70, 80, 80, 85, 60, 70, 80, 80, 70, 60]
      },
      {
        type: 'bar',
        stack: 'Level',
        barWidth: 15,
        silent: true,
        data: [15, 20, 30, 20, 20, 15, 40, 30, 20, 20, 30, 40]
      }
    ]
  };

  const changeDisplayType = () => {
     if(iconType === 'bar-chart'){
      setIconType('list')
     }else{
      setIconType('bar-chart')
     }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Icon name={iconType} style={styles.chartIcon} size={30} color='deepskyblue' onPress={()=>changeDisplayType()} />
      {
        iconType === 'bar-chart' ?
         (
          <ScrollView style={styles.scrollview}>

            <Text style={styles.key}> Basis </Text>
            <Text style={styles.value}> ES6, TypeScript, Html,Css,jQuery, Bootstrap, Less, scss </Text>

            <Text style={styles.key}> React </Text>
            <Text style={styles.value}> React, React Native, redux, react-router, DVA, UMI, Ant Design </Text>

            <Text style={styles.key}> Vue </Text>
            <Text style={styles.value}> Vue, Vuex, Vue Router, axios, Element UI </Text>

            <Text style={styles.key}> Angular </Text>
            <Text style={styles.value}> AngularJS1.0 </Text>

            <Text style={styles.key}> Charts </Text>
            <Text style={styles.value}> Echart, Highchart, DataV, Svg, Canvas </Text>

             <Text style={styles.key}> SSR </Text>
             <Text style={styles.value}>Next.js, Nuxt.js</Text>

            <Text style={styles.key}> Mini Program </Text>
            <Text style={styles.value}>WeChat applet, Alipay applet, Uni App, mpvue</Text>

            <Text style={styles.key}> Packaging tool </Text>
            <Text style={styles.value}>webpack, Grunt, Gulp</Text>

            <Text style={styles.key}> Tool Library </Text>
            <Text style={styles.value}>Lodash.js, Underscore.js</Text>

            <Text style={styles.key}> SQL </Text>
            <Text style={styles.value}> MySQL, PostgreSQL</Text>

            <Text style={styles.key}> Mock </Text>
            <Text style={styles.value}> YAPI, Mock Server</Text>

            <Text style={styles.key}> Backend technology </Text>
            <Text style={styles.value}> Node, Java, c#, JSP, servlet </Text>
           </ScrollView>
        ) :
        (
          <View style={{marginTop: 20}}>
            <Echarts option={option} height={600} />
          </View>
        )
      }
     </SafeAreaView>
  );
}

export default SkillsScreen