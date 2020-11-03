import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Trial from './Trial';
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
  
  showEmptyListView = () => {
    return(
      <View>
        <Text>
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
            //extraData={this.state}
            data={[
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'First Item',
              end_date: '8/16/20'
            },
            {
              id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
              title: 'Second Item',
              end_date: '8/17/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              title: 'Third Item',
              end_date: '8/18/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d74',
              title: 'Fourth Item',
              end_date: '8/19/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d75',
              title: 'Fifth Item',
              end_date: '8/20/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d76',
              title: 'Sixth Item',
              end_date: '8/21/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d77',
              title: 'Seventh Item',
              end_date: '8/22/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d78',
              title: 'Eighth Item',
              end_date: '8/23/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d79',
              title: 'Nineth Item',
              end_date: '8/24/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d80',
              title: 'Tenth Item',
              end_date: '8/25/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d81',
              title: 'Eleventh Item',
              end_date: '8/26/20'
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d82',
              title: 'Twelveth Item',
              end_date: '8/27/20'
            },
            
          ]}
            keyExtractor={(item, index) => Math.random().toString()}
            ListEmptyComponent={this.showEmptyListView()}
            renderItem={({ item, index }) => (
              <Trial 
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
