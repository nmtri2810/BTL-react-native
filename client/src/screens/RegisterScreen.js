import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { isValidEmail, isValidPassword } from "../utilities/validation";
import Context from "../store/Context";
import Spinner from "react-native-loading-spinner-overlay";
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const { register, isLoading } = useContext(Context);

    const handleRegisterPress = async () => {
        if (isValidEmail(email) == false) {
            alert("Email not in correct format");
            return;
        }
        if (isValidPassword(password) == false) {
            alert("Password must be longer than 3 characters");
            return;
        }
        if (rePassword.length == 0) {
            alert("Please confirm password");
            return;
        }
        if (password != rePassword) {
            alert("Passwords do not match");
            return;
        }

        await register(email, password);
    };

    const handleLoginPress = () => {
        navigation.navigate("Login");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <View style={styles.contentContainer}>
                <Spinner visible={isLoading} />
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
                <TextInput style={{ height: 0.01 }} />
                <MyInput
                    placeholder="Re-enter password"
                    value={rePassword}
                    onChangeText={(rePassword) => setRePassword(rePassword)}
                    secureTextEntry={true}
                />
                <MyButton text="Register" handlePress={handleRegisterPress} />
                <View style={styles.registerContainer}>
                    <Text style={styles.newUserText}>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={handleLoginPress}>
                        <Text style={styles.registerText}>Login</Text>
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

export default RegisterScreen;
