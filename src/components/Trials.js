import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Trial from './Trial';
import * as firebase from 'firebase';
import firestore from '@react-native-firebase/firestore';


class Trials extends Component {
    constructor(props) {
      super(props);
      this.state = {
        trialsListId: null,
        trials: null,
        isLoading: true
      };
    }

    componentDidMount(){
      this.getUsersTrialsListId().then(this.getUsersTrialsList).then(this.setUsersTrialsList);
    }
    
    getUsersTrialsListId = () => {
      return new Promise ((resolve, reject) => {

        firebase.auth().onAuthStateChanged( user => {
          if(user){
            const currentUid = user.uid;
            firestore()
            .collection('users')
            .doc(currentUid)
            .onSnapshot( result => {
              if(result) {
                resolve(result._data.trialsListId);
              } else {
                Alert.alert('Sorry, the app is crashed. Please close and open it again');
              }
            });
          }
        })
      })
    }
    
    getUsersTrialsList = (trialsListId) => {
      return new Promise ((resolve, reject) => {
            firestore()
            .collection('trialsList')
            .doc(trialsListId)
            .collection('trial')
            .orderBy('end_date')
            .onSnapshot( result => {
              if(result) {
                let results = {
                  trials: result.docs,
                  trialsListId: trialsListId          
                }
                resolve(results);
              } else {
                Alert.alert('Sorry, the app is crashed. Please close and open it again.');
              }
            });
      })
    }
    
    setUsersTrialsList = (trials) => {
      this.setState({
        trialsListId: trials.trialsListId,
        trials: trials.trials,
        isLoading: false
      })
    }
  
  _handleLogout = () => {
    firebase.auth().signOut().then(()=> {
      // const {dispatch} = this.props;
      // dispatch({type: 'USER_LOGOUT'})
    }).catch(function(error) {
      //Alert.alert(error)
    });
  }
  
  _handleComplete = (trialId) => {
    firestore()
      .collection('trialsList')
      .doc(this.state.trialsListId)
      .collection('trial')
      .doc(trialId)
      .delete()
      .then(() => {
        this.getUsersTrialsList(this.state.trialsListId).then(this.setUsersTrialsList);
        console.log('User deleted!');
      });
  }
  
  showEmptyListView = () => {
    return(
      <View>
        <Text style={{color: 'white'}}>
          You don't have trials to track yet
        </Text>
      </View>
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingTop: 50,
        }}>
        <Text 
        onPress={this._handleLogout}  
        style={styles.addIcon}>+</Text>

          <Text style={{
            fontSize: 30,
            color: "white",
            fontWeight: "300",
            paddingLeft: 30
          }}>Trials</Text>
          <FlatList
            data={this.state.trials}
            keyExtractor={(item, index) => Math.random().toString()}
            ListEmptyComponent={this.showEmptyListView()}
            renderItem={({ item, index }) => (
              <Trial 
              handleComplete={this._handleComplete}
              item={item}
              ></Trial>
            )}
          />
        </View>
      </View>
    );
  }
}

export default Trials;

const styles = StyleSheet.create({
  container: {
    //height: '100%',
    backgroundColor: 'black',
    flex: 1,
    width: "100%"
  },
  addIcon: {
    fontSize: 35,
    color: "orange",
    textAlign: "right",
    paddingRight: 20,
    fontWeight: "200"
  }
});
