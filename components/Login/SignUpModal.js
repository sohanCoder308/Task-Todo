import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';

const SignUpModal = (props) => (
  <Modal animationType="fade" transparent={true} visible={props.visible}>
    <View style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <KeyboardAvoidingView style={styles.upperContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.title}>SIGN UP</Text>
            <Icon
              name={'cross'}
              type={'entypo'}
              size={50}
              color={'purple'}
              containerStyle={styles.icon}
              onPress={props.onCancle}
            />
          </View>
          <CustomInput
            style={styles.input}
            placeholder={'First Name'}
            maxLength={8}
            onChangeText={(text) => props.setFirstName(text)}
          />
          <CustomInput
            style={styles.input}
            placeholder={'Last Name'}
            maxLength={8}
            onChangeText={(text) => props.setLastName(text)}
          />
          <CustomInput
            style={styles.input}
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={(text) => props.setEmail(text)}
          />
          <CustomInput
            style={styles.input}
            placeholder={'Password'}
            secureTextEntry={true}
            onChangeText={(text) => props.setPassword(text)}
          />
          <CustomInput
            style={styles.input}
            placeholder={'Confirm Password'}
            secureTextEntry={true}
            onChangeText={(text) => props.setConfirmPassword(text)}
          />

          <CustomButton
            title={'Submit'}
            onPress={props.onSubmit}
            style={styles.button}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  </Modal>
);

export default SignUpModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    /*borderTopLeftRadius: 45,
    borderTopRightRadius: 45,*/
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginTop: 50,
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '500',
    color: 'purple',
    marginTop: 30,
  },
  icon: {
    position: 'absolute',
    left: 150,
    top: 0,
    bottom: 20,
  },
  input: {
    width: '75%',
    height: 55,
    marginTop: 20,
    borderColor: 'purple',
    fontSize: 20,
    fontWeight: '400',
  },
  button: {
    marginTop: 20,
  },
});
