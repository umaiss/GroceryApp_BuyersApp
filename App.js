import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

import UserLoginScreen from './Screens/UserLoginScreen'
import UserSignUpScreen from './Screens/UserSignupScreen'

console.disableYellowBox = true;

var firebaseConfig = {
  apiKey: "AIzaSyCBuYMr9VceHuHhBiuL26KdkKdNp-ql88g",
  authDomain: "groceryapp-476c8.firebaseapp.com",
  databaseURL: "https://groceryapp-476c8.firebaseio.com",
  projectId: "groceryapp-476c8",
  storageBucket: "groceryapp-476c8.appspot.com",
  messagingSenderId: "702463648312",
  appId: "1:702463648312:web:874d86609af4a2192efccd",
  measurementId: "G-12VF4CBJS8"

};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const RootStack = createStackNavigator( //Navigation Stack
  {
    
    Login: UserLoginScreen,
    Signup: UserSignUpScreen,
  },
  {
    defaultNavigationOptions:
    {
      header: null

      //testing git from vs code
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