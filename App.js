import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './src/components/Auth/Auth.js';
import Loading from './src/components/Loading.js';
import Trials from './src/components/Trials.js';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import NavigationService from './NavigationService';

export default function App() {
  return (
    <View style={styles.container}>
      <MainAppContainer
      ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);}}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

const MainAppNavigator = createStackNavigator(
  {
    Loading:{
      screen: Loading,
      navigationOptions: {
          header: null // Will hide header for HomePage
      }},
    Auth:{
      screen: Auth,
      navigationOptions: {
          header: null // Will hide header for HomePage
      }},
    Trials:{
      screen: Trials,
      navigationOptions: {
          header: null // Will hide header for HomePage
      }}
  }
);

const MainAppContainer = createAppContainer(MainAppNavigator);