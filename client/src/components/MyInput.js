import React from "react";
import { StyleSheet, TextInput } from "react-native";

const MyInput = ({
    placeholder,
    value,
    onChangeText,
    selectTextOnFocus,
    keyboardType,
    secureTextEntry,
    multiline,
    notesStyle,
    editable,
}) => {
    return (
        <TextInput
            style={[
                styles.input,
                notesStyle && styles.notesInput,
                editable == false && styles.black,
            ]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            selectTextOnFocus={selectTextOnFocus}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            editable={editable}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 16,
        padding: 10,
    },
    notesInput: {
        height: 80,
    },
    black: {
        color: "#000",
        fontWeight: "bold",
    },
});

export default MyInput;
