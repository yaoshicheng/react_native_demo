import * as React from 'react';
import { Button, View, Text, Image, SafeAreaView, ScrollView, StyleSheet, Animated, useRef, Share, TouchableOpacity, TouchableNativeFeedback, TouchableHighlight   } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { I18n, localeMessage} from './locales/i18n';
//import * as WeChat from 'react-native-wechat';

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  catong: {
    width: 148,height: 200,
    position: 'relative',marginTop: 80,marginLeft: 30,zIndex: 999
  },
  pingpang: {
    width: 200,height: 111,
     position: 'relative',marginTop: -160,marginLeft: 180,
  },
  tennis: {
    width: 176,height: 111,
    position: 'relative',marginTop: 20,marginLeft: 10,
  },
  zhuoqiu: {
    width: 176,height: 111,
    position: 'relative',marginTop: -100,marginLeft: 180,
  },
  diaoyu: {
    width: 256,height: 154,
    position: 'relative',marginTop: 60,marginLeft: 60,
  },
  fadingContainer: {
//    paddingVertical: 8,
//    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  shareIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 100000
  }
})

function HobbyScreen({ navigation }) {

  const fadeAnim1 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim2 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim3 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim4 = React.useRef(new Animated.Value(0)).current;
  const fadeAnim5 = React.useRef(new Animated.Value(0)).current;
  const [appLocale, setAppLocale] = React.useState(I18n.locale);

  const changeLocale = () => {
    if(I18n.locale === 'zh'){
      setAppLocale('en')
      I18n.locale = 'en'
    } else {
      setAppLocale('zh')
      I18n.locale = 'zh'
    }
  }

  useFocusEffect(() => {
    [fadeAnim1, fadeAnim2, fadeAnim3, fadeAnim4, fadeAnim5].forEach(item=>{
       let time = Math.random()*3000 + 1000
       Animated.timing(item, {
         toValue: 1,
         duration: time,
         useNativeDriver: true,
       }).start();
     })
    }
  );

  const onShare = async (msg) => {
    try {
      const result = await Share.share({
        title: 'Awesome',
        message: "What's your hobby?" + msg,
      }, { dialogTitle: 'Awesome'});
    } catch (error) {
      alert(error.message);
    }
  };

  return (
   <SafeAreaView style={styles.container}>
     <View style={styles.scrollview}>
        <TouchableOpacity onPress={()=>onShare("Do you like Anime?")} >
          <Animated.View style={[{opacity: fadeAnim1}]}>
            <Image style={styles.catong} source={require('../assets/catong.jpg')} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onShare("Do you like table tennis?")} >
          <Animated.View style={[{opacity: fadeAnim2}]}>
            <Image style={styles.pingpang} source={require('../assets/pingpang.jpg')} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onShare("Do you like tennis?")} >
          <Animated.View style={[{opacity: fadeAnim3}]}>
            <Image style={styles.tennis} source={require('../assets/tennis.jpg')} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onShare("Do you like Billiards?")} >
          <Animated.View style={[{opacity: fadeAnim4}]}>
            <Image style={styles.zhuoqiu} source={require('../assets/zhuoqiu.jpg')} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>onShare("Do you like Billiards?")} >
         <Animated.View style={[{opacity: fadeAnim5}]}>
          <Image style={styles.diaoyu} source={require('../assets/diaoyu.jpg')} />
         </Animated.View>
         </TouchableOpacity>
      </View>
   </SafeAreaView>
  );
}

export default HobbyScreen
