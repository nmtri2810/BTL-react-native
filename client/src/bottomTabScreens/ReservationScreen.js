import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { isValidEmail, isValidReservation } from '../utilities/Validation';
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native';

const ReservationScreen = () => {
  const [reservationTimeOutput, setReservationTimeOutput] = useState("");
  const [reservationTimeSaved, setReservationTimeSaved] = useState("");
  const [numOfPeople, setNumOfPeople] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const navigation = useNavigation();

  const { reservate, updateUser, isLoading } = useContext(AuthContext);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (datetime) => {
    const currentDateTime = moment();
    const selectedDateTime = moment(datetime);

    const timeDifference = selectedDateTime.diff(currentDateTime, 'minutes');

    if(timeDifference < 29) {
      alert('Please make a reservation at least 30 minutes in advance');
      hideDatePicker();
    } else {
      setReservationTimeOutput(moment(datetime).format('MMMM, Do YYYY HH:mm'));
      setReservationTimeSaved(moment(datetime).format('YYYYMMDDHHmmss'));
      hideDatePicker();
    }
  };

  const handleSubmitPress = () => {
    if(isValidEmail(email) == false) {
      alert("Email not in correct format");
      return;
    } 

    if(isValidReservation(reservationTimeOutput, numOfPeople, name, phoneNum) == false) {
      console.log("Not valid");
      return;
    }
    
    if(notes.length === 0) {
      setNotes(" ");
    }
    
    reservate(reservationTimeSaved, numOfPeople, notes, email);
    updateUser(name, phoneNum, email);
    navigation.navigate('Success');
    return;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <Spinner visible={isLoading} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Reservation Screen</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Reservation Time <Text style={{color: 'red'}}>*</Text></Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.input}>{reservationTimeOutput ? reservationTimeOutput.toString() : "Enter reservation time"}</Text>
          </TouchableOpacity>
          <DateTimePickerModal 
            isVisible={isDatePickerVisible}
            mode="datetime"
            minimumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            is24Hour={true}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of People <Text style={{color: 'red'}}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            placeholder="2"
            value={numOfPeople}
            onChangeText={(numOfPeople) => setNumOfPeople(numOfPeople)}
            selectTextOnFocus={false}
            keyboardType="numeric" 
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name <Text style={{color: 'red'}}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nguyen Van A"
            value={name}
            onChangeText={(name) => setName(name)}
            selectTextOnFocus={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number <Text style={{color: 'red'}}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            placeholder="0123456789" 
            keyboardType="phone-pad" 
            value={phoneNum}
            onChangeText={(phoneNum) => setPhoneNum(phoneNum)}
            selectTextOnFocus={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email <Text style={{color: 'red'}}>*</Text></Text>
          <TextInput 
            style={styles.input} 
            placeholder="abc@gmail.com" 
            keyboardType="email-address" 
            value={email}
            onChangeText={(email) => setEmail(email)}
            selectTextOnFocus={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Notes (Additional)</Text>
          <TextInput 
            style={[styles.input, styles.notesInput]} 
            placeholder="Enter any additional notes" multiline={true} 
            value={notes}
            onChangeText={(notes) => setNotes(notes)}
            selectTextOnFocus={false}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitPress}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    width: '100%',
  },
  notesInput: {
    height: 80,
  },
  submitButton: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReservationScreen;
