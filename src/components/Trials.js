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
          You don't have assigned chores yet
        </Text>
      </View>
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          paddingTop: 50
        }}>
          <Text style={{
            fontSize: 30,
            color: "white",
            fontWeight: "bold",
          }}>Trials</Text>
          <FlatList
            //extraData={this.state}
            data={[
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'First Item',
            },
            {
              id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
              title: 'Second Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              title: 'Third Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d74',
              title: 'Fourth Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d75',
              title: 'Fifth Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d76',
              title: 'Sixth Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d77',
              title: 'Seventh Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d78',
              title: 'Eighth Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d79',
              title: 'Nineth Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d80',
              title: 'Tenth Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d81',
              title: 'Eleventh Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d82',
              title: 'Twelveth Item',
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
      </ScrollView>
        <Button
          style={{marginBottom: 10, marginTop:100}}
          //buttonStyle={styles.button}
          title="Log Out"
          onPress={this._handleLogout}
        />
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
  }
});
