import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FormGroupOutput = ({ label, data }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.data}>{data}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    label: {
        marginLeft: 10,
        fontSize: 15,
    },
    data: {
        marginRight: 10,
        fontSize: 15,
    },
});

export default FormGroupOutput;
