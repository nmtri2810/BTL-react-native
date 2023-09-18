import React, { useContext, useEffect, useState } from "react";
import Context from "../store/Context";
import { FlatList, StyleSheet, View } from "react-native";
import Card from "../components/Card";
import FormGroupOutput from "../components/FormGroupOutput";
import moment from "moment";

import axios from "../api/customAxios";

const ReservationHistoryScreen = () => {
    const { userInfo } = useContext(Context);

    const [reservationHistoryList, setReservationHistoryList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                let reservationRes = await axios.get(
                    `reservations?id=${userInfo.user.id}`
                );
                setReservationHistoryList(reservationRes.data.reservations);
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
                <FormGroupOutput label="Full name" data={item.name} />
                <FormGroupOutput label="Phone number" data={item.phone_num} />
                <FormGroupOutput label="Email" data={item.email} />
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
