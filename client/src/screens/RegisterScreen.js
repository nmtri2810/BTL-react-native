import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { isValidEmail, isValidPassword } from '../utilities/Validation';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const val = useContext(AuthContext);

  const handleRegisterPress = () => {
    if(isValidEmail(email) == false) {
      alert("Email not in correct format");
      return;
    } 
    if(isValidPassword(password) == false) {
      alert("password must be longer than 3 characters");
      return;
    } 
    if(email == "trinm@gmail.com" && password == 123456) {
      navigation.navigate('Home');
    } else {
      alert("Invalid email or password");
      return;
    }
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <TextInput
        style={styles.input}
        placeholder="Re-enter password"
        secureTextEntry
        value={password}
        onChangeText={(password) => setPassword(password)}
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

export default LoginScreen;
