import * as React from 'react';
import { Button, View, Text, SafeAreaView, ScrollView , StyleSheet, Linking, Alert, PanResponder } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as WeChat from 'react-native-wechat';

import { isURL } from './utils/url';
import { Scheme } from './constant'
import { I18n, localeMessage } from './locales/i18n'

// wx438ef5f1518816c4
WeChat.registerApp('wx438ef5f1518816c4');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollview: {
    marginVertical: 20,
  },
  key: {
     color: 'forestgreen',
     fontWeight: 'bold',
     marginBottom: 5,
     paddingLeft: 30,
     paddingRight: 30,
   },
   value: {
    color: '#666',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 15,
    borderBottomColor: '#ddd',
    textAlign: 'justify',
   },
  text: {
    fontSize: 42,
  },
});

const Works_ZH = [
  { name: 'AToken官网', url: 'https://www.atoken.com/', detail: '此项目为Atoken钱包官网，介绍Atoken相关内容，以Next.js为基础，实现SSR渲染，实现seo优化，使用TypeScript加强项目健壮性，支持中文，英文，越南语，同时适配PC和移动端' },
  { name: 'Union Ledger 官网', url: 'https://www.unionledger.com.cn/index', detail: '此项目为链盟官网，以Next.js为基础，实现SSR渲染，实现seo优化，使用TypeScript加强项目健壮性' },
  { name: '吹尽黄沙始到金，悉数20年间最具投资价值个股', url: 'https://www.windmoney.com.cn/mm/top10/index.html', detail: '结合Echart柱状图和时间轴动态展示近20年各股的收益情况，气势恢弘' },
  { name: '基金帝国', url: 'http://www.windmoney.com.cn/scatter/index.html?fundname=华夏', detail: '结合气泡图和时间轴动态展示各个基金的发展历程，可替换基金简称展示不同基金的发展' },
  { name: '基金经理流向图', url: 'https://www.windmoney.com.cn/mm/managerChange/index.html?fundname=%E5%8D%8E%E5%A4%8F%E5%9F%BA%E9%87%91', detail: '结合桑基图展示各个基金公司的基金经理流向图，清晰明了的展示各个基金公司的基金经理的来源和去向，同时可切换基金公司，查看上游及下游公司的情况' },
  { name: '熊猫智行 Mini Program', scheme: 'weixin', url: '在微信小程序中搜索熊猫智行小程序', detail: '熊猫公交智能小程序，一次注册用户，绑定免密支付，终身便捷乘坐熊猫公交，小程序实现了用户注册，免密绑定，脸部信息录入，订单查询，公交站台查询等功能' },
  { name: 'TakeGo Mini Program', scheme: 'weixin', url: '在微信小程序中搜索TakeGo小程序', detail: 'TakeGo小程序实现一次注册用户，绑定免密支付，终身便捷购物，小程序实现了用户注册，免密绑定，订单查询，优惠活动查询，附近货柜查询等功能。在支付宝和微信都实现了TakeGo小程序' },
  { name: '万得基金 Mini Program', scheme: 'weixin', url: '在微信小程序中搜索万得基金小程序', detail: '全面介绍各个基金的小程序，包括基金公司，基金经理等，流畅便捷' },
]


const Works_EN = [
  { name: 'AToken Official Website', url: 'https://www.atoken.com/', detail: 'This project is the official website of Atoken Wallet. It introduces Atoken related content. Based on Next.js, it realizes SSR rendering, realizes seo optimization, uses TypeScript to enhance the robustness of the project, supports Chinese, English, Vietnamese, and adapts to PC and mobile terminals.' },
  { name: 'Union Ledger Official Website', url: 'https://www.unionledger.com.cn/index', detail: 'This project is the official website of Lianmeng, based on Next.js, realizes SSR rendering, realizes seo optimization, and uses TypeScript to enhance the robustness of the project' },
  { name: 'The most valuable stocks for investment in all 20 years', url: 'https://www.windmoney.com.cn/mm/top10/index.html', detail: 'Combining the Echart histogram and timeline to dynamically display the earnings of each stock in the past 20 years, the momentum is magnificent' },
  { name: 'Fund Empire', url: 'http://www.windmoney.com.cn/scatter/index.html?fundname=华夏', detail: 'Combine bubble chart and timeline to dynamically display the development history of each fund, and replace the fund abbreviation to display the development of different funds' },
  { name: 'Fund manager flow chart', url: 'https://www.windmoney.com.cn/mm/managerChange/index.html?fundname=%E5%8D%8E%E5%A4%8F%E5%9F%BA%E9%87%91', detail: 'Combine the Sankey chart to display the flow of fund managers of each fund company, clearly show the source and destination of fund managers of each fund company, and switch fund companies to view upstream and downstream companies.' },
  { name: 'Panda Bus Smart Mini Program', scheme: 'weixin', url: 'Search for Panda Zhixing Mini Program in WeChat Mini Program', detail: 'Panda Bus Smart Mini Program, one-time registration of users, binding free-of-secret payment, and convenient life-long ride on Panda Bus. The mini program realizes user registration, non-secret binding, facial information entry, order query, bus station query and other functions' },
  { name: 'TakeGo Mini Program', scheme: 'weixin', url: 'Search for TakeGo Mini Program in WeChat Mini Program', detail: 'The TakeGo applet realizes one-time registration of users, binds password-free payments, and makes life-long convenient shopping. The applet realizes user registration, password-free binding, order inquiry, preferential activity inquiry, nearby container inquiry and other functions. TakeGo applet has been implemented in Alipay and WeChat' },
  { name: 'Wind Fund Mini Program', scheme: 'weixin', url: 'Search Wind Fund Mini Program in WeChat Mini Program', detail: 'A comprehensive introduction to the small programs of various funds, including fund companies, fund managers, etc., smooth and convenient' },
]

function WorksScreen({ navigation }) {

  const InitWorks = I18n.locale === 'en' ? Works_EN : Works_ZH;
  const [Works, setWorks] = React.useState(InitWorks);

  useFocusEffect(
    React.useCallback(() => {
      setWorks(I18n.locale === 'en' ? Works_EN : Works_ZH)
    },[I18n.locale])
  );

  const openExternalLink = (url, scheme) => {
    if(isURL(url)){
     Alert.alert(localeMessage('global.tip1'),localeMessage('global.confirmMsg1'), [
      { text: localeMessage('global.cancel'),style: 'cancel' },
      { text: localeMessage('global.confirm'), onPress: () => Linking.openURL(url) },
    ])

    }else{
      Linking.canOpenURL(Scheme[scheme]).then(supported => { // weixin://  alipay://
        if (supported) {
          Alert.alert(localeMessage('global.tip1'),url, [
            {text: localeMessage('global.cancel'),style: 'cancel'},
           { text: localeMessage('global.confirm'), onPress: () => WeChat.openWXApp() },
          ])
//           Linking.openURL('weixin://');
//           WeChat.launchMini({
//             userName: "gh_90e804acd0d5", // 拉起的小程序的username
//             miniProgramType: 0 // 拉起小程序的类型. 0-正式版 1-开发版 2-体验版
//          });

         } else {
           Alert.alert(localeMessage('global.tip1'), localeMessage('global.appRequire'));
         }
       });
     }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView  style={styles.scrollview}>
        {
          Works.map(work => {
            const { name, url, detail, scheme } = work;
            return (
              <View key={name} key={name}>
                <Text style={styles.key} onPress={()=> openExternalLink(url, scheme)}> { name } </Text>
                <Text style={styles.value} onPress={()=> openExternalLink(url, scheme)}> {detail} </Text>
              </View>
            )
          })
        }
       </ScrollView >
     </SafeAreaView>
  );
}

export default WorksScreen