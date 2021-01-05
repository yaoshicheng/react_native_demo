import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import IntroductionScreen from './Introduction';
import ExperienceScreen from './Experience';
import HobbyScreen from './Hobby';
import { I18n, localeMessage } from './locales/i18n';

const Drawer = createDrawerNavigator();

function HomeScreen({ navigation }) {
  const [locale, setLocale] = React.useState(I18n.locale);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      if(locale !== I18n.locale){
        setLocale(I18n.locale)
      }
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Drawer.Navigator>
       <Drawer.Screen name="Introduction" options={{title: localeMessage('drawerMenu.introduction')}} component={IntroductionScreen} />
       <Drawer.Screen name="Experience" options={{title: localeMessage('drawerMenu.experience')}}component={ExperienceScreen} />
       <Drawer.Screen name="Hobby" options={{title: localeMessage('drawerMenu.hobby')}} component={HobbyScreen} />
    </Drawer.Navigator>
  );
}

export default HomeScreen

