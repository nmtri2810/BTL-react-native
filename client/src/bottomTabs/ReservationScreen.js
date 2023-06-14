import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReservationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Reservation Screen</Text>
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
});

export default ReservationScreen;
