import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const HomeScreen = ({ navigation }) => {
  const { userInfo, isLoading,logout } = useContext(AuthContext);

  const handleLogoutPress = () => {
    console.log("logout");
    logout();
  };

  const handleReservationPress = () => {
    navigation.navigate('Reservation');
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.heading}>Welcome {userInfo.data.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleReservationPress}>
        <Text style={styles.buttonText}>Go to Reservation</Text>
      </TouchableOpacity>
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
