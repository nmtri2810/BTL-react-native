import React, { useContext, useEffect, useState } from "react";
import Context from "../store/Context";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "../components/Card";
import FormGroupOutput from "../components/FormGroupOutput";
import moment from "moment";

import { reservationHistory } from "../services/reservationService";
import { getUser } from "../services/userService";

const ReservationHistoryScreen = () => {
    const [reservationHistoryList, setReservationHistoryList] = useState([]);
    const [name, setName] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");

    //small bug when update user, all of user name and phoneNum history are updated -> fix by save name and phoneNum in db
    const { userInfo } = useContext(Context);

    useEffect(() => {
        async function fetchData() {
            try {
                let reservationRes = await reservationHistory(userInfo.user_id);
                setReservationHistoryList(reservationRes.data.reservations);

                let userRes = await getUser(userInfo.user_id);
                let user = userRes.data.users;

                setName(user.name);
                setPhoneNum(user.phone_num);
                setEmail(user.email);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    const renderReservationHistoryList = ({ item }) => (
        <View style={styles.cardContainer}>
            <Card shadow={true}>
                <FormGroupOutput
                    label="Reservation code"
                    data={`#${item.id}`}
                />
                <FormGroupOutput
                    label="Reservation time"
                    data={moment(item.reservation_time).format(
                        "MMMM, Do YYYY HH:mm"
                    )}
                />
                <FormGroupOutput
                    label="Number of people"
                    data={item.num_of_people}
                />
                <FormGroupOutput label="Full name" data={name} />
                <FormGroupOutput label="Phone number" data={phoneNum} />
                <FormGroupOutput label="Email" data={email} />
                <FormGroupOutput
                    label="Notes"
                    data={item.notes === "No Notes" ? "" : item.notes}
                />
            </Card>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={reservationHistoryList}
                renderItem={renderReservationHistoryList}
                keyExtractor={(item) => item.id.toString()}
                style={styles.reservationHistoryList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 10,
    },
    reservationHistoryList: {
        width: "100%",
        flex: 1,
    },
    cardContainer: {
        padding: 10,
    },
});

export default ReservationHistoryScreen;
