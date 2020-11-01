import React, { Component } from 'react';
import { Animated, Text, Alert, View, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

class Trial extends Component {
  constructor(props) {
    super(props);   
    this.state = {
    };          
  }
  
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
         <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Archive
          </Animated.Text>
      </RectButton>
    );
  }
  
  render() {
    return (
      <Swipeable　renderRightActions={this.renderLeftActions}>
        <Text style={{
          fontSize: 30,
          color: "gray",
          marginLeft: 20,
          marginRight: 10,
          paddingBottom: 10,
          paddingTop: 10
        }}>{this.props.item.title}</Text>
      </Swipeable>
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
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'red',
    padding: 10,
  },
  rightAction: {
    // alignItems: 'center',
    // flex: 1,
    // justifyContent: 'center',
    paddingRight: -10
  },
});
