import React from "react";
import { StyleSheet, View } from "react-native";

const Card = ({ children, isCenter, shadow }) => {
    return (
        <View
            style={[
                styles.card,
                isCenter && styles.center,
                shadow && styles.cardShadow,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    center: {
        alignItems: "center",
    },
});

export default Card;
