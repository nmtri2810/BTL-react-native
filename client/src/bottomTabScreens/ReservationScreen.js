import React, { useContext, useEffect, useState } from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { isValidReservation } from "../utilities/validation";
import Context from "../store/Context";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import MyButton from "../components/MyButton";
import FormGroupInput from "../components/FormGroupInput";
import MyInput from "../components/MyInput";
import Title from "../components/Title";
import { reserve } from "../services/reservationService";
import { getUser, updateUser } from "../services/userService";

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

    const { userInfo, isLoading } = useContext(Context);

    useEffect(() => {
        async function fetchData() {
            try {
                let res = await getUser(userInfo.user_id);
                let user = res.data.users;

                setName(user.name);
                setPhoneNum(user.phone_num);
                setEmail(user.email);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (datetime) => {
        const currentDateTime = moment();
        const selectedDateTime = moment(datetime);

        const timeDifference = selectedDateTime.diff(
            currentDateTime,
            "minutes"
        );

        if (timeDifference < 29) {
            alert("Please make a reservation at least 30 minutes in advance");
            hideDatePicker();
        } else {
            setReservationTimeOutput(
                moment(datetime).format("MMMM, Do YYYY HH:mm")
            );
            setReservationTimeSaved(moment(datetime).format("YYYYMMDDHHmmss"));
            hideDatePicker();
        }
    };

    const handleSubmitPress = async () => {
        try {
            // do this for npx expo run --web
            // if (
            //     isValidReservation(
            //         reservationTimeOutput,
            //         numOfPeople,
            //         name,
            //         phoneNum
            //     ) == false
            // ) {
            //     console.log("Not valid");
            //     return;
            // }

            const updatedNotes = notes.length === 0 ? "No Notes" : notes;

            //reservationTimeSaved
            let reserveRes = await reserve(
                "20230604190000",
                numOfPeople,
                updatedNotes,
                email
            );
            let userRes = await updateUser(name, phoneNum, email);

            navigation.navigate("Table Reservation Information", {
                reservationInfo: reserveRes.data.reservation,
                userInfo: userRes.data.user,
            });
            return;
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <Spinner visible={isLoading} />
            <Title title="Reservation" />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <FormGroupInput labelText="Reservation Time" hasStar={true}>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={styles.input}>
                            {reservationTimeOutput
                                ? reservationTimeOutput.toString()
                                : "Enter reservation time"}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        minimumDate={new Date()}
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        is24Hour={true}
                    />
                </FormGroupInput>

                <FormGroupInput labelText="Number of People" hasStar={true}>
                    <MyInput
                        placeholder="2"
                        value={numOfPeople}
                        onChangeText={(numOfPeople) =>
                            setNumOfPeople(numOfPeople)
                        }
                        selectTextOnFocus={false}
                        keyboardType="numeric"
                    />
                </FormGroupInput>

                <FormGroupInput labelText="Name" hasStar={true}>
                    <MyInput
                        placeholder="Nguyen Van A"
                        value={name}
                        onChangeText={(name) => setName(name)}
                        selectTextOnFocus={false}
                    />
                </FormGroupInput>

                <FormGroupInput labelText="Phone Number" hasStar={true}>
                    <MyInput
                        placeholder="0123456789"
                        value={phoneNum}
                        onChangeText={(phoneNum) => setPhoneNum(phoneNum)}
                        selectTextOnFocus={false}
                        keyboardType="phone-pad"
                    />
                </FormGroupInput>

                <FormGroupInput labelText="Email" hasStar={true}>
                    <MyInput
                        value={email}
                        selectTextOnFocus={false}
                        keyboardType="email-address"
                        editable={false}
                    />
                </FormGroupInput>

                <FormGroupInput labelText="Notes (Additional)">
                    <MyInput
                        placeholder="Enter any additional notes"
                        value={notes}
                        onChangeText={(notes) => setNotes(notes)}
                        selectTextOnFocus={false}
                        multiline={true}
                        notesStyle={true}
                    />
                </FormGroupInput>

                <View style={{ marginBottom: 60 }} />

                <MyButton text="Submit" handlePress={handleSubmitPress} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 16,
    },
    contentContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 16,
        padding: 10,
    },
});

export default ReservationScreen;
