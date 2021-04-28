import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, Image } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SignUpModal from '../components/Login/SignUpModal';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      isModalVisible: false,
    };
  }
  handleLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Successfully Logged In');
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  handleSignUp = () => {
    this.setState({ isModalVisible: true });
  };
  handleSubmit = () => {
    var { firstName, lastName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          db.collection('users').add({
            first_name: firstName,
            last_name: lastName,
            email_id: email,
          });
          alert('User Added Successfully', '', [
            {
              text: 'OK',
              onPress: () => this.setState({ isModalVisible: false }),
            },
          ]);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };
  render() {
    var { email, password, isModalVisible } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.middleContainer}>
          <Text style={styles.titleText}>TASK TODO APP</Text>
          <CustomInput
            placeholder={'email@address.com'}
            keyboardType={'email-address'}
            onChangeText={(text) => {
              this.setState({
                email: text,
              });
            }}
            leftIcon={<Icon name={'email'} />}
          />
          <CustomInput
            secureTextEntry={true}
            placeholder={'Password'}
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
            leftIcon={<Icon name={'lock'} />}
          />
          <CustomButton
            title={'Login'}
            onPress={() => this.handleLogin(email, password)}
          />
          <CustomButton
            title={'Sign Up'}
            onPress={() => this.handleSignUp(email, password)}
          />
        </View>

        <SignUpModal
          setFirstName={(text) => this.setState({ firstName: text })}
          setLastName={(text) => this.setState({ lastName: text })}
          setEmail={(text) => this.setState({ email: text })}
          setPassword={(text) => this.setState({ password: text })}
          setConfirmPassword={(text) =>
            this.setState({ confirmPassword: text })
          }
          onSubmit={() => this.handleSubmit()}
          onCancle={() => {
            this.setState({ isModalVisible: false });
          }}
          visible={isModalVisible}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  upperContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  middleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  lowerContainer: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  titleText: {
    fontSize: 40,
    color: 'black',
    backgroundColor: 'pink',
    marginTop: 80,
    marginBottom: 40,
    fontWeight: 'bold',
  },
});
