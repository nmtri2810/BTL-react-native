import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = () => {
  const { userInfo, isLoading } = useContext(AuthContext);

  const handleLogoutPress = () => {
    console.log("logout");
    logout();
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {/* replace {userInfo.data.email} with user */}
      <Text style={styles.heading}>Welcome user</Text> 
      <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={handleLogoutPress}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
