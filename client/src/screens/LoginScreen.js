import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { isValidEmail, isValidPassword } from '../utilities/Validation';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { checkUserExist, login, isLoading } = useContext(AuthContext);

  const handleLoginPress = () => {
    if(isValidEmail(email) == false) {
      alert("Email not in correct format");
      return;
    } 
    if(isValidPassword(password) == false) {
      alert("password must be longer than 3 characters");
      return;
    }

    checkUserExist(email)
      .then((exists) => {
        if (exists) {
          login(email, password)
            .then((checkPassword) => {
              if(checkPassword) {
                navigation.navigate('Home');
                return;
              } else {
                alert("Email or password is incorrect");
                return;
              }
            })
            .catch((e) => {
              console.log(e);
              alert('An error occurred while checking email login');
            })
        } else {
          alert("Email or password is incorrect");
          return;
        }
      })
      .catch((e) => {
        console.log(e);
        alert('An error occurred while checking email existence');
      });

  };

  const handleForgotPasswordPress = () => {
    alert('Forgot Password');
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.heading}>Restaurant Reservation</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.registerContainer}>
        <Text style={styles.newUserText}>New User?</Text>
        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.registerText}>Register</Text>
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

export default LoginScreen;
