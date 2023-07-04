import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HomeFlatlist from "../components/HomeFlatlist";

const HomeScreen = () => {
    const offer = [
        {
            id: 1,
            title: "Lorem ipsum dolor sit amet",
            datetime: "Lorem ipsum dolor sit amet",
            imageUrl: "https://reactnative.dev/img/tiny_logo.png",
        },
        {
            id: 2,
            title: "Lorem ipsum dolor sit amet",
            datetime: "Lorem ipsum dolor sit amet",
            imageUrl: "https://reactnative.dev/img/tiny_logo.png",
        },
        {
            id: 3,
            title: "Lorem ipsum dolor sit amet",
            datetime: "Lorem ipsum dolor sit amet",
            imageUrl: "https://reactnative.dev/img/tiny_logo.png",
        },
        {
            id: 4,
            title: "Lorem ipsum dolor sit amet",
            datetime: "Lorem ipsum dolor sit amet",
            imageUrl: "https://reactnative.dev/img/tiny_logo.png",
        },
        {
            id: 5,
            title: "Lorem ipsum dolor sit amet",
            datetime: "Lorem ipsum dolor sit amet",
            imageUrl: "https://reactnative.dev/img/tiny_logo.png",
        },
    ];

    return <HomeFlatlist items={offer} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
    },
});

export default HomeScreen;
