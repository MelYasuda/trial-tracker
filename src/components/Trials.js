import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';

class Trials extends Component {
  _handleLogout = () => {
    firebase.auth().signOut().then(()=> {
      // const {dispatch} = this.props;
      // dispatch({type: 'USER_LOGOUT'})
    }).catch(function(error) {
      //Alert.alert(error)
    });
  }
  
  render() {
    return      <Button
                  style={{marginBottom: 10, marginTop:100}}
                  //buttonStyle={styles.button}
                  title="Log Out"
                  onPress={this._handleLogout}
                />
  }
}

export default Trials;
