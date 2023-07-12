import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeFlatlist from "../components/HomeFlatlist";
import { offers } from "../data/homeItems";
import Title from "../components/Title";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Title title="Home" />
            <HomeFlatlist items={offers} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 16,
    },
});

export default HomeScreen;
