import React from "react";
import { StyleSheet, Text, View } from "react-native";

const FormGroupInput = ({ children, labelText, hasStar }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>
                {labelText} {hasStar && <Text style={{ color: "red" }}>*</Text>}
            </Text>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        marginTop: -8,
    },
});

export default FormGroupInput;
