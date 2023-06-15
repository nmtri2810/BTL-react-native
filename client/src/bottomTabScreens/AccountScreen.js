import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const AccountScreen = () => {
  const { userInfo, isLoading } = useContext(AuthContext);

  const handleLogoutPress = () => {
    console.log("logout");
    logout();
  };

  const accountItems = [
    { key: '1', title: 'Personal Information' },
    { key: '2', title: 'Table Reservation History' },
    { key: '3', title: 'Terms of Use' },
    { key: '4', title: 'Settings' },
    { key: '5', title: 'Settings' },
    { key: '6', title: 'Settings' },
    { key: '7', title: 'Settings' },
    { key: '8', title: 'Settings' },
  ];

  const renderAccountItem = ({ item }) => (
    <TouchableOpacity style={styles.accountItem} onPress={() => handleAccountItemPress(item.key)}>
      <Text style={styles.accountItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <View style={styles.header}>
        {/* replace userInfo.data.email... with username  */}
        <Image source={{uri: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg'}} style={styles.userImage} />
        <Text style={styles.username}>username</Text>
      </View>

      <FlatList
        data={accountItems}
        renderItem={renderAccountItem}
        keyExtractor={(item) => item.key}
        style={styles.accountList}
      />

      <View style={styles.bottom}>
        <Text style={styles.versionText}>Version 1.0</Text>
        {/* Additional items for the account bottom */}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogoutPress}>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  accountList: {
    width: '100%',
    marginBottom: 24,
  },
  accountItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  accountItemText: {
    fontSize: 16,
  },
  bottom: {
    alignItems: 'center',
    marginBottom: 24,
  },
  versionText: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
