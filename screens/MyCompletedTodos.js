import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Card, Icon, ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader.js';
import firebase from 'firebase';
import db from '../config.js';

export default class MyCompletedTodos extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      userName: '',
      completedTodos: [],
    };
    this.completedRef = null;
  }

  componentDidMount() {
    this.getCompletedTodos();
  }
  getCompletedTodos() {
    this.completedRef = db
      .collection('completed_todos')
      .where('user_id', '==', this.state.userId)
      .onSnapshot((snapshot) => {
        var completedTodos = [];
        snapshot.docs.map((doc) => {
          var cTodos = doc.data();
          cTodos['doc_id'] = doc.id;
          completedTodos.push(cTodos);
        });
        this.setState({
          completedTodos: completedTodos,
        });
      });
  }
  componentWillUnmount() {
    this.completedRef();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.todo_name}
        subtitle={'Todo Description:  ' + item.todo_description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <MyHeader
            title="Completed Todos"
            navigation={this.props.navigation}
            backgroundColor={'pink'}
          />
        </View>
        <ScrollView>
          {this.state.completedTodos.length === 0 ? (
            <View style={styles.subtitle}>
              <Text style={{fontSize:20}}>You have no completed todos.</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.completedTodos}
              renderItem={this.renderItem}
            />
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subtitle: {
    flex: 1,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
})
