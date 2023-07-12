import React from "react";
import { StyleSheet, Text } from "react-native";

const Title = ({ title }) => {
    return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 24,
    },
});

export default Title;
