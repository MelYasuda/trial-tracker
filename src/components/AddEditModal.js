import React, {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import TrialForm from './TrialForm';

export default class AddEditModal extends Component {
  state = {
    isModalVisible: false,
  };
 
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
 
  render() {
    return (
      <View >
      <Text 
      onPress={this.toggleModal}
      style={styles.addIcon}>+</Text>        
      <Modal 
        isVisible={this.state.isModalVisible}
        onSwipeComplete={() => this.setState({isModalVisible: false})}
        onSwipeCancel={() => this.setState({isModalVisible: true})}
        swipeDirection="down"
        swipeThreshold={150}
        style={styles.modal}
        >
          <View style={{height: "100%"}}>
            <Text style={styles.cancelButton} onPress={this.toggleModal}>Cancel</Text>
            <TrialForm />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    //flex: 1,
    width: "100%",
    height: "85%"
  },
  modal: {
    backgroundColor: '#211717',
    flex: 1,
    //justifyContent: 'flex-end',
    margin: 0,
    marginTop: 70,
    borderRadius: 10
  },
  cancelButton: {
    color: "orange",
    fontSize: 20,
    width: 90,
    paddingLeft: 10,
    paddingTop: 10
  },
  addIcon: {
    fontSize: 30,
    color: "orange",
    textAlign: "right",
    paddingRight: 20,
    fontWeight: "200"
  }
});