import React, { useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import MyButton from "../components/MyButton";
import Card from "../components/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountScreen = () => {
    const { logout, userInfo, isLoading } = useContext(AuthContext);

    const handleAccountItemPress = (key) => {
        console.log(key);
    };

    const handleLogoutPress = () => {
        console.log("logout");
        logout();
    };

    const accountItems = [
        {
            key: "1",
            title: "Personal Information",
            icon: (
                <MaterialCommunityIcons
                    name="account-outline"
                    color="black"
                    size={26}
                />
            ),
        },
        {
            key: "2",
            title: "Preferential",
            icon: (
                <MaterialCommunityIcons
                    name="gift-outline"
                    color="black"
                    size={26}
                />
            ),
        },
        {
            key: "3",
            title: "Transaction History",
            icon: (
                <MaterialCommunityIcons
                    name="credit-card-clock-outline"
                    color="black"
                    size={26}
                />
            ),
        },
        {
            key: "4",
            title: "Table Reservation History",
            icon: (
                <MaterialCommunityIcons
                    name="clipboard-text-clock-outline"
                    color="black"
                    size={26}
                />
            ),
        },
        {
            key: "5",
            title: "Terms of Use",
            icon: (
                <MaterialCommunityIcons
                    name="file-document-outline"
                    color="black"
                    size={26}
                />
            ),
        },
        {
            key: "6",
            title: "Settings",
            icon: (
                <MaterialCommunityIcons
                    name="cog-outline"
                    color="black"
                    size={26}
                />
            ),
        },
        {
            key: "7",
            title: "About Us",
            icon: (
                <MaterialCommunityIcons
                    name="information-outline"
                    color="black"
                    size={26}
                />
            ),
        },
        {
            key: "8",
            title: "Support",
            icon: (
                <MaterialCommunityIcons
                    name="phone-check-outline"
                    color="black"
                    size={26}
                />
            ),
        },
    ];

    const renderAccountItem = ({ item }) => (
        <Card>
            <TouchableOpacity
                style={styles.accountItem}
                onPress={() => handleAccountItemPress(item.key)}
            >
                {item.icon}
                <Text style={styles.accountItemText}>{item.title}</Text>
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />

            <View style={styles.header}>
                <Image
                    source={{
                        uri: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
                    }}
                    style={styles.userImage}
                />
                <Text style={styles.username}>{userInfo.data.email}</Text>
            </View>

            <FlatList
                data={accountItems}
                renderItem={renderAccountItem}
                keyExtractor={(item) => item.key}
                style={styles.accountList}
            />

            <View style={styles.bottom}>
                <Text style={styles.versionText}>Version 1.0</Text>
            </View>

            <MyButton text="Logout" handlePress={handleLogoutPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
    },
    header: {
        alignItems: "center",
        marginBottom: 24,
        marginTop: 40,
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 8,
    },
    username: {
        fontSize: 20,
        fontWeight: "bold",
    },
    accountList: {
        width: "100%",
    },
    accountItem: {
        flexDirection: "row",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    accountItemText: {
        fontSize: 16,
        marginLeft: 10,
    },
    bottom: {
        alignItems: "center",
        marginBottom: 24,
    },
    versionText: {
        fontSize: 12,
        color: "#666",
        marginTop: 24,
    },
});

export default AccountScreen;
