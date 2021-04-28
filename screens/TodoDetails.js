import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Card, Icon, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';

export default class TodoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      date: firebase.firestore.FieldValue.serverTimestamp(),
      todoId: this.props.navigation.getParam('details')['todo_id'],
      todoName: this.props.navigation.getParam('details')['todo_name'],
      todoDescription: this.props.navigation.getParam('details')[
        'todo_description'
      ],
      todoStatus: this.props.navigation.getParam('details')['todo_status'],
      todo_s: '',
      docId: '',
    };
  }
  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };
  updateTodoStatus() {
    var uniqueId = this.createUniqueId();
    db.collection('remaining_todos')
      .where('user_id', '==', this.state.userId)
      .where('todo_id', '==', this.state.todoId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection('remaining_todos').doc(doc.id).update({
            todo_status: 'completed',
          });
          db.collection('completed_todos').add({
            todo_name: this.state.todoName,
            todo_description: this.state.todoDescription,
            todo_id: this.state.todoId,
            todo_status: 'completed',
            user_id: this.state.userId,
            date: this.state.date,
          });
          this.sendNotification();
        });
      });
  }
  sendNotification = () => {
    db.collection('all_notifications').add({
      todo_name: this.state.todoName,
      todo_description: this.state.todoDescription,
      message: 'This todo is completed.',
      todo_id: this.state.todoId,
      notification_status: 'unread',
      user_id: this.state.userId,
    });
  };
  render() {
    return (
      <View>
        <Header
          navigation={this.props.navigation}
          leftComponent={
            <Icon
              name={'arrow-left'}
              type={'feather'}
              color={'black'}
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: 'Todo Details',
            style: styles.title,
          }}
          backgroundColor={'pink'}
        />
        <ScrollView>
          <Card title={'Todo Details'} style={{ fontSize: 20 }}>
            {this.state.todoName ? (
              <Text>Todo Name: {this.state.todoName}</Text>
            ) : null}
            {this.state.todoDescription ? (
              <Text>Todo Description: {this.state.todoDescription}</Text>
            ) : null}
          </Card>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.updateTodoStatus();
              this.props.navigation.navigate('Completed Todos');
            }}>
            <Text style={styles.buttonText}>Mark Todo as Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    width: '75%',
    height: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(60),
    backgroundColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 16,
    marginTop: 20,
    marginLeft: 45
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 20
  }
});
