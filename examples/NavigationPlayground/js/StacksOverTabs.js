/**
 * @flow
 */

import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import {
  SafeAreaView,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import SampleText from './SampleText';
import { Button } from './commonComponents/ButtonWithMargin';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView forceInset={{ horizontal: 'always' }}>
      <SampleText>{banner}</SampleText>
      <Button
        onPress={() => navigation.navigate('Profile', { name: 'Jordan' })}
        title="Open profile screen"
      />
      <Button
        onPress={() => navigation.navigate('NotifSettings')}
        title="Open notifications screen"
      />
      <Button
        onPress={() => navigation.navigate('SettingsTab')}
        title="Go to settings tab"
      />
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.name}s Profile`}
    navigation={navigation}
  />
);

const MyNotificationsSettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Notifications Screen" navigation={navigation} />
);

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner="Settings Screen" navigation={navigation} />
);

const getNavigationOptionsFrom = children => props => {
  const { index, routes } = props.navigation.state;
  const { routeName } = routes[index];
  const route = children[routeName];

  const navigationOptions =
    (route && route.navigationOptions) ||
    (route && route.screen && route.screen.navigationOptions);

  if (typeof navigationOptions === 'function') {
    return navigationOptions(props);
  }

  return navigationOptions;
};

const tabs = {
  MainTab: {
    screen: MyHomeScreen,
    path: '/',
    navigationOptions: {
      title: 'Welcome',
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-home' : 'ios-home-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
  SettingsTab: {
    screen: MySettingsScreen,
    path: '/settings',
    navigationOptions: {
      title: 'Settings',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-settings' : 'ios-settings-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    },
  },
};

const TabNav = createBottomTabNavigator(tabs, {
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
});

TabNav.navigationOptions = getNavigationOptionsFrom(tabs);

const StacksOverTabs = createStackNavigator({
  Root: {
    screen: TabNav,
  },
  NotifSettings: {
    screen: MyNotificationsSettingsScreen,
    navigationOptions: {
      title: 'Notifications',
    },
  },
  Profile: {
    screen: MyProfileScreen,
    path: '/people/:name',
    navigationOptions: ({ navigation }) => {
      title: `${navigation.state.params.name}'s Profile!`;
    },
  },
});

export default StacksOverTabs;
