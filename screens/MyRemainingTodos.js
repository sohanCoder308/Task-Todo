import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class MyRemainingTodos extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      remainingTodos: [],
    };
    this.todosRef = null;
  }
  componentDidMount() {
    this.getTodosList();
  }
  getTodosList = () => {
    var { userId } = this.state;
    this.todosRef = db
      .collection('remaining_todos')
      .where('user_id', '==', userId)
      .where('todo_status', '==', 'remaining')
      .onSnapshot((snapshot) => {
        var remainingTodos = snapshot.docs.map((document) => document.data());
        this.setState({
          remainingTodos: remainingTodos,
        });
      });
  };
  componentWillUnmount() {
    this.todosRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.todo_name}
        subtitle={item.todo_description}
        titleStyle={{ color: 'black', fontWeight: 'bold'}}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate('TodoDetails', {
                details: item,
              });
            }}>
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };
  render() {
    return (
      <ScrollView>
        <MyHeader
          title="Todos Remaining"
          navigation={this.props.navigation}
          backgroundColor={'orange'}
        />
        <View style={{ flex: 1 }}>
          {this.state.remainingTodos.length === 0 ? (
            <View style={styles.subContainer}>
              <Text style={{ fontSize: 20 }}>You have no todos left.</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.remainingTodos}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  subContainer: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },
  buttonText: {
    fontWeight: 'bold',
    marginLeft: '5',
    color: 'black',
  },
});
