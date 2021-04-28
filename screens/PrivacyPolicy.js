import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MyHeader from '../components/MyHeader';

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MyHeader title="User Stories" navigation={this.props.navigation} />
        <ScrollView style={styles.container2}>
          <Text style={styles.userS}>
            Go to this link for User Stories of this app:-
            https://bit.ly/3aBYDCS
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userS: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50
  }
});
