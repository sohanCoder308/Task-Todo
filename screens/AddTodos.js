import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
  Text,
  TouchableHighlight,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Header,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

import MyHeader from '../components/MyHeader';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

export default class AddTodos extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      todoName: '',
      todoDescription: '',
      todoStatus: '',
      date: firebase.firestore.FieldValue.serverTimestamp(),
    };
  }
  getUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };
  handleTodos = (todoName, todoDescription) => {
    var { userId } = this.state;
    var uniqueId = this.getUniqueId();
    db.collection('remaining_todos').add({
      todo_name: todoName,
      todo_description: todoDescription,
      user_id: userId,
      todo_status: 'remaining',
      todo_id: uniqueId,
      date: this.state.date,
    });
    alert('Todo Added Successfully.!');
    this.setState({
      todoName: '',
      todoDescription: '',
      todoStatus: '',
    });
    console.log(todoName, todoDescription);
  };
  render() {
    var { todoName, todoDescription } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <MyHeader
            title="Add Todo"
            navigation={this.props.navigation}
            backgroundColor={'pink'}
          />
        </View>
        <TextInput
          placeholder={'Todo Name'}
          style={styles.formTextInput}
          onChangeText={(todoname) => {
            this.setState({
              todoName: todoname,
            });
          }}
          value={this.state.todoName}
        />
        <TextInput
          placeholder={'Todo Description'}
          multiline={true}
          style={styles.formTextInput2}
          onChangeText={(tododesc) => {
            this.setState({
              todoDescription: tododesc,
            });
          }}
          value={this.state.todoDescription}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.handleTodos(todoName, todoDescription);
          }}>
          <Text>Add Todo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyBoardStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  formTextInput2: {
    width: '75%',
    height: 100,
    alignSelf: 'center',
    borderColor: '#ffab91',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  button: {
    width: '75%',
    height: 50,
    marginLeft: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
  },
});
