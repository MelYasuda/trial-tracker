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
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 0],
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
          Done
          </Animated.Text>
      </RectButton>
    );
  }
  
  render() {
    return (
      <Swipeable
        renderRightActions={this.renderLeftActions}
        friction={2}
        rightThreshold={40}
        >
        <View 
          style={{
            borderBottomWidth :0.3,
            borderBottomColor: 'white'
            }}>
          <Text style={{
            fontSize: 40,
            color: "gray",
            marginLeft: 20,
            marginRight: 10,
            paddingBottom: 10,
            paddingTop: 10,
          }}>{this.props.item.title}</Text>
        </View>
      </Swipeable>
    );
  }
}

export default Trial;

const styles = StyleSheet.create({
  container: {
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
     //justifyContent: 'center',
  },
});
