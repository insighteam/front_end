import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import { Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';
import InvitationScreen from '../screens/InvitationScreen';
import ContentScreen from '../screens/ContentScreen';
import MapScreen from '../screens/MapScreen';

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    }
  },
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      header: null,
    }
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
      title: 'Moment',
    },
  },
  Invitation: {
    screen: InvitationScreen
  },
  Content: {
    screen: ContentScreen
  }
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;
