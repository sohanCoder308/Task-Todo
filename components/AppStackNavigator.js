import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import MyRemainingTodos from '../screens/MyRemainingTodos';
import TodoDetails from '../screens/TodoDetails';

export const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: MyRemainingTodos,
      navigationOptions: {
        headerShown: false,
      },
    },
    TodoDetails: {
      screen: TodoDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
);
