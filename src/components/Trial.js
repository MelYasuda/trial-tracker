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
  
  handleComplete = () => {
    this.props.handleComplete();
  }
  
  renderLeftActions = (progress, dragX) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 0],
    });
    return (
      <RectButton style={styles.rightAction} onPress={this.handleComplete}>
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
            borderBottomColor: 'rgba(255,0,0,0.3)',
            flexDirection:'row'
            }}>
          <Text style={styles.trialText}>{this.props.item.title}</Text>
          <Text style={styles.dateText}>{this.props.item.end_date}</Text>
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
  trialText: {
    fontSize: 40,
    fontWeight: "200",
    color: "gray",
    marginLeft: 20,
    marginRight: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "200",
    color: "gray",
    textAlign: "right",
    paddingTop: 20,
    flex: 1,
    paddingRight: 10
  },
  actionText: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'red',
    padding: 20,
  },
  rightAction: {
     // alignItems: 'center',
     // flex: 1,
     //justifyContent: 'center',
  },
});
