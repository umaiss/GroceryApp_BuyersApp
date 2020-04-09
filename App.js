import React , {Component}from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import LodingScreen from './Screens/LodingScreen'

console.disableYellowBox = true;

const RootStack = createStackNavigator( //Navigation Stack
  {
    Loding: LodingScreen,
  },
  {
    defaultNavigationOptions:
    {
      header: null
    }
  }
);
const AppNavigator = createAppContainer(RootStack)

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}