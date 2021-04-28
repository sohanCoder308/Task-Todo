import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { AppTabNavigator } from './AppTabNavigator';
import CustomSideBarMenu from './CustomSideBarMenu';
import MyCompletedTodos from '../screens/MyCompletedTodos';
import SettingsScreen from '../screens/SettingsScreen';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import NotificationsScreen from '../screens/NotificationsScreen';

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name={"home"} type={'ionicons'}/>,
      },
    },
    'Completed Todos': {
      screen: MyCompletedTodos,
      navigationOptions: {
        drawerIcon: <Icon name={"check-box"} type={'ionicons'}/>
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        drawerIcon: <Icon name={'notifications'} type={'ionicons'}/>
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerIcon: <Icon name={'settings'} type={'feather'}/>
      }
    },
    'User Stories': {
      screen: PrivacyPolicy,
      navigationOptions: {
        drawerIcon: <Icon name={'users'} type={'entypo'}/>
      }
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: 'Home',
  }
);
