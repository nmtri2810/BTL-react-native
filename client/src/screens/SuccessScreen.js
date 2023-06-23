import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';

const SuccessScreen = () => {
  const { reservationInfo, userInfo } = useContext(AuthContext);

  const reservationTime = moment(reservationInfo.data.reservation_time).format('MMMM, Do YYYY HH:mm');

  return (
    <View style={styles.container}>
      <Text>Ma dat ban: {reservationInfo.data.id}</Text>
      <Text>Thoi gian dat ban: {reservationTime}</Text>
      <Text>So luong nguoi: {reservationInfo.data.num_of_people}</Text>
      <Text>Ho ten: {userInfo.data.name}</Text>
      <Text>SDT: {userInfo.data.phone_num}</Text>
      <Text>Email: {userInfo.data.email}</Text>
      <Text>Ghi chu: {reservationInfo.data.notes}</Text>
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
