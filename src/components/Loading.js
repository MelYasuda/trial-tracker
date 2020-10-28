import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as firebase from 'firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import NavigationService from '../../NavigationService';


class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user);
      if(user){
        const resetAction =StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate( { routeName: 'Trials'})],
        })
        this.props.navigation.dispatch(resetAction);
      } else {
        // NavigationService.reset('LoginPage')
        const resetAction =StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate( { routeName: 'Auth'})],
        })
        this.props.navigation.dispatch(resetAction);
      }
    });
  }

  render(){
    return(
      <View style={{flex:1, justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

export default Loading;