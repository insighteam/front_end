import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainScreen from '../screens/MainScreen';

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Signup: {
    screen: SignupScreen
  }
});

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;
