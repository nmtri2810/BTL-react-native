import React from "react";
import { StyleSheet, View } from "react-native";

const Card = ({ children, isCenter, shadow, marginBottom }) => {
    return (
        <View
            style={[
                styles.card,
                isCenter && styles.center,
                shadow && styles.cardShadow,
                marginBottom && styles.marginBottom,
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
    },
    cardShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    center: {
        alignItems: "center",
    },
    marginBottom: {
        marginBottom: 10,
    },
});

export default Card;
