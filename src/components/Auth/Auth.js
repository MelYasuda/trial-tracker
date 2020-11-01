import React, { Component } from 'react';
import * as GoogleSignIn from 'expo-google-sign-in';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
//import { GoogleSigninButton } from 'react-native-google-signin';
import * as firebase from 'firebase';
import Emoji from 'react-native-emoji';

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
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.text}>You buy stuff. <Emoji name="shopping_trolley" style={{fontSize: 40}} /></Text>
          <Text style={styles.text}>We remind you </Text>
          <Text style={styles.text}>when to return it. <Emoji name="alarm_clock" style={{fontSize: 40}} /></Text>
          <Text style={styles.text}>No more <Emoji name="money_with_wings" style={{fontSize: 40}} /> <Emoji name="woman-facepalming" style={{fontSize: 40}} /></Text>
        </View>
        <View style={styles.signupMenu}>
          <Button
          title="Sign In With Google"
          buttonStyle={{ 
            width: 350, 
            height: 48,
            borderRadius:15,
            backgroundColor:'#1684fb'
                }}
          titleStyle={{
            fontWeight: "bold"
          }}
          //size={GoogleSigninButton.Size.Wide}
          //color={GoogleSigninButton.Color.Dark}
          onPress={this.onPress}
          //disabled={this.state.isSigninInProgress}
           />
       </View>
     </View>
   );
  }
}

const styles = StyleSheet.create({
  signupMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
    paddingBottom: 50
  },
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  description: {
    paddingTop: 80,
    paddingLeft: 30
  }
});
