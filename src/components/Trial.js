import React, { Component } from 'react';
import { Text, Alert, View, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class Trial extends Component {
  constructor(props) {
    super(props);   
    this.state = {
    };          
  }
  
  render() {
    return (
      <View>
              <Text style={{
                fontSize: 30,
                color: "gray",
                marginLeft: 20,
                marginRight: 10,
                paddingBottom: 10,
                paddingTop: 10
              }}>{this.props.item.title}</Text>
        </View>
    );
  }
}

export default Trial;

const styles = StyleSheet.create({
  container: {
    //height: '100%',
    backgroundColor: 'black',
    flex: 1,
    width: "100%"
  }
});
