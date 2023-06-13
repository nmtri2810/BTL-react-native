import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { isValidEmail, isValidPassword } from '../utilities/Validation';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const { checkUserExist, register, isLoading } = useContext(AuthContext);

  const handleRegisterPress = () => {
    if(isValidEmail(email) == false) {
      alert("Email not in correct format");
      return;
    } 
    if(isValidPassword(password) == false) {
      alert("Password must be longer than 3 characters");
      return;
    }
    if(rePassword.length == 0) {
      alert("Please confirm password");
      return;
    } else if(password != rePassword) {
      alert("Passwords do not match");
      return;
    }
    
    checkUserExist(email)
      .then((exists) => {
        if (exists) {
          alert('Email already exists');
          return;
        } else {
          register(email, password);
          navigation.navigate('Home');
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        alert('An error occurred while checking email existence');
      });

  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        selectTextOnFocus={false}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput style={{height: 0.01}}/> 
      <TextInput
        style={styles.input}
        placeholder="Re-enter password"
        secureTextEntry
        value={rePassword}
        onChangeText={(rePassword) => setRePassword(rePassword)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.newUserText}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.registerText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 8,
  },
  registerContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  newUserText: {
    marginRight: 4,
  },
  registerText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
