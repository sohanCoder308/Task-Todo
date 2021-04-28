import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Icon } from 'react-native-elements';
/*import Icon from 'react-native-vector-icons/FontAwesome';
import Ico from 'react-native-vector-icons/Entypo'*/
import { AppStackNavigator } from './AppStackNavigator';
import AddTodos from '../screens/AddTodos';
import MyRemainingTodos from '../screens/MyRemainingTodos';

export const AppTabNavigator = createMaterialBottomTabNavigator({
  AppStack: {
    screen: AppStackNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon
          style={[{ color: 'white' }]}
          size={22}
          name={'tasks'}
          type={'font-awesome'}
        />
      ),
      activeColor: 'purple',
      inactiveColor: 'white',
      barStyle: { backgroundColor: 'orange' },
      tabBarLabel: 'Todos Remaining',
    },
  },
  'Add Todos': {
    screen: AddTodos,
    navigationOptions: {
      tabBarIcon: (tintColor) => (
        <Icon
          style={[{ color: 'white' }]}
          size={20}
          name={'add-to-list'}
          type={'entypo'}
        />
      ),
      activeColor: 'purple',
      inactiveColor: 'white',
      barStyle: { backgroundColor: 'pink' },
      tabBarLabel: 'Add Todos',
    },
  },
});
