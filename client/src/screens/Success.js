import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Success</Text>
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

export default SuccessScreen;
