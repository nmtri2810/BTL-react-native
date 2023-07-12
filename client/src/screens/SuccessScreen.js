import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Context } from "../context/Context";
import moment from "moment";
import FormGroupOutput from "../components/FormGroupOutput";
import Card from "../components/Card";

const SuccessScreen = () => {
    const { reservationInfo, userInfo } = useContext(Context);

    return (
        <View style={styles.container}>
            <Card isCenter={true} shadow={true} marginBottom={true}>
                <Image
                    style={styles.successLogo}
                    source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/148/148767.png",
                    }}
                />
                <Text style={styles.status}>Status: success! </Text>
            </Card>
            <Card shadow={true}>
                <Text style={styles.detail}>Details</Text>
                <FormGroupOutput
                    label="Reservation code"
                    data={`#${reservationInfo.data.id}`}
                />
                <FormGroupOutput
                    label="Reservation time"
                    data={moment(reservationInfo.data.reservation_time).format(
                        "MMMM, Do YYYY HH:mm"
                    )}
                />
                <FormGroupOutput
                    label="Number of people"
                    data={reservationInfo.data.num_of_people}
                />
                <FormGroupOutput label="Full name" data={userInfo.data.name} />
                <FormGroupOutput
                    label="Phone number"
                    data={userInfo.data.phone_num}
                />
                <FormGroupOutput label="Email" data={userInfo.data.email} />
                <FormGroupOutput
                    label="Notes"
                    data={
                        reservationInfo.data.notes === "No Notes"
                            ? ""
                            : reservationInfo.data.notes
                    }
                />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#fff",
    },
    successLogo: {
        width: 80,
        height: 80,
        marginTop: 10,
    },
    status: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
    },
    detail: {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 25,
        fontWeight: "bold",
    },
});

export default SuccessScreen;
