import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { isValidEmail, isValidPassword } from "../utilities/Validation";
import { Context } from "../context/Context";
import Spinner from "react-native-loading-spinner-overlay";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading } = useContext(Context);

    const handleLoginPress = () => {
        if (isValidEmail(email) == false) {
            alert("Email not in correct format");
            return;
        }
        if (isValidPassword(password) == false) {
            alert("password must be longer than 3 characters");
            return;
        }

        login(email, password);
    };

    const handleForgotPasswordPress = () => {
        alert("Forgot Password");
    };

    const handleRegisterPress = () => {
        navigation.navigate("Register");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <View style={styles.contentContainer}>
                <Spinner visible={isLoading} />
                <Text style={styles.heading}>Restaurant Reservation</Text>
                <MyInput
                    placeholder="Enter email"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                    selectTextOnFocus={false}
                    keyboardType="email-address"
                />
                <MyInput
                    placeholder="Enter password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}
                />
                <MyButton text="Login" handlePress={handleLoginPress} />
                <TouchableOpacity onPress={handleForgotPasswordPress}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                    <Text style={styles.newUserText}>New User?</Text>
                    <TouchableOpacity onPress={handleRegisterPress}>
                        <Text style={styles.registerText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    linkText: {
        color: "#000",
        textDecorationLine: "underline",
        marginBottom: 8,
    },
    registerContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 20,
    },
    newUserText: {
        marginRight: 4,
    },
    registerText: {
        color: "#000",
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
