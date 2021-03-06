import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

import MyHeader from '../components/MyHeader';
import SwipeableFlatlist from '../components/SwipeableFlatlist';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: [],
    };

    this.notificationRef = null;
  }

  getNotifications = () => {
    const { userId } = this.state;

    this.notificationRef = db
      .collection('all_notifications')
      .where('user_id','==',userId)
      .where('notification_status', '==', 'unread')
      .onSnapshot(
        (snapshot) => {
          let notifications = [];
          snapshot.docs.map((doc) => {
            let notification = doc.data();
            notification['doc_id'] = doc.id;
            notification['key'] = doc.id;
            notifications.push(notification);
          });
          this.setState({
            allNotifications: notifications,
          });
        },
        () => {
          this.notificationRef();
        }
      );
  };

  componentDidMount() {
    this.getNotifications();
  }

  componentWillUnmount() {
    this.notificationRef();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <MyHeader
            title={'Notifications'}
            navigation={this.props.navigation}
            backgroundColor={'purple'}
          />
        </View>
        <View style={styles.lowerContainer}>
          {this.state.allNotifications.length === 0 ? (
            <View style={styles.emptyList}>
              <Text style={styles.emptyListTitle}>
                You have no notifications
              </Text>
            </View>
          ) : (
            <SwipeableFlatlist allNotifications={this.state.allNotifications} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    flex: 0.12,
  },
  lowerContainer: {
    flex: 0.88,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListTitle: {
    fontSize: 25,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
  },
});
