import React, { Component } from 'react';
import * as GoogleSignIn from 'expo-google-sign-in';
import { Text, View } from 'react-native';
import { GoogleSigninButton } from 'react-native-google-signin';
import * as firebase from 'firebase';

export default class Auth extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '',
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ user });
  };

  signOutAsync = async () => {
    await GoogleSignIn.signOutAsync();
    this.setState({ user: null });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        const { accessToken, idToken } = user.auth;
        var credential = new firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        );
        await firebase.auth().signInWithCredential(credential);
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };

  onPress = () => {
    if (this.state.user) {
      this.signOutAsync();
    } else {
      this.signInAsync();
    }
  };

  render() {
    return   (
      <View>
        <GoogleSigninButton
        style={{ width: 192, 
                 height: 48, 
                 marginTop: 100,
                 alignItems: 'center',
                 justifyContent: 'center', }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.onPress}
        //disabled={this.state.isSigninInProgress}
         />
     </View>
   );
  }
}
