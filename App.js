import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { withNavigation } from 'react-navigation';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'

import { I18n, localeMessage } from './src/locales/i18n';

import ProjectsScreen from './src/Projects';
import SkillsScreen from './src/Skills';
import HomeScreen from './src/Home';
import WorksScreen from './src/Works';

const Tab = createBottomTabNavigator();
//const SettingsStack = createStackNavigator();
//const HomeStack = createStackNavigator();

 export default function App(props) {
  const [locale, setLocale] = React.useState(I18n.locale);

  const changeTab = () => {
    if(locale !== I18n.locale){
      setLocale(I18n.locale)
    }
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'color-palette-outline';
            } else if (route.name === 'Skills') {
              iconName = 'boat-outline';
            }
            else if (route.name === 'Projects') {
              iconName = 'albums';
            }
            else if (route.name === 'Works') {
              iconName = 'basketball-outline';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarOnPress: ()=>{
            if(locale !== I18n.locale){
              setLocale(I18n.locale)
            }
          }
        })}
      >
        <Tab.Screen name="Home" options={{title: localeMessage('tabMenu.summary')}} component={HomeScreen} />
        <Tab.Screen name="Skills" options={{title: localeMessage('tabMenu.skill')}} component={SkillsScreen} />
        <Tab.Screen name="Projects" options={{title: localeMessage('tabMenu.project')}} component={ProjectsScreen} />
        <Tab.Screen name="Works" options={{title: localeMessage('tabMenu.work'), tabBarBadge: '!'}} component={WorksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//class App extends React.Component {
//
//  changeTab = () => {
//    if(locale !== I18n.locale){
//      setLocale(I18n.locale)
//    }
//  }
// render(){
//    return (
//      <NavigationContainer>
//        <Tab.Navigator
//          screenOptions={({ route }) => ({
//            tabBarIcon: ({ color, size }) => {
//              let iconName;
//              if (route.name === 'Home') {
//                iconName = 'color-palette-outline';
//              } else if (route.name === 'Skills') {
//                iconName = 'boat-outline';
//              }
//              else if (route.name === 'Projects') {
//                iconName = 'albums';
//              }
//              else if (route.name === 'Works') {
//                iconName = 'basketball-outline';
//              }
//              // You can return any component that you like here!
//              return <Icon name={iconName} size={size} color={color} />;
//            },
//          })}
//        >
//          <Tab.Screen name="Home" onPress={this.changeTab} options={{title: localeMessage('tabMenu.summary')}} component={HomeScreen} />
//          <Tab.Screen name="Skills" onPress={this.changeTab} options={{title: localeMessage('tabMenu.skill')}} component={SkillsScreen} />
//          <Tab.Screen name="Projects" onPress={this.changeTab} options={{title: localeMessage('tabMenu.project')}} component={ProjectsScreen} />
//          <Tab.Screen name="Works" onPress={this.changeTab} options={{title: localeMessage('tabMenu.work'), tabBarBadge: '!'}} component={WorksScreen} />
//        </Tab.Navigator>
//      </NavigationContainer>
//    );
// }
//}
//
//export default App
