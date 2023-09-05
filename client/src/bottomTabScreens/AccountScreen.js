import React, { useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList,
} from "react-native";
import Context from "../store/Context";
import Spinner from "react-native-loading-spinner-overlay";
import MyButton from "../components/MyButton";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { accountItems } from "../data/accountItems";

const AccountScreen = () => {
    const { logout, userInfo, isLoading } = useContext(Context);

    const navigation = useNavigation();
    const handleAccountItemPress = (id) => {
        if (id == 4) {
            navigation.navigate("Reservation History");
        }
    };

    const handleLogoutPress = () => {
        console.log("logout");
        logout();
    };

    const renderAccountItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <Card>
                <TouchableOpacity
                    style={styles.accountItem}
                    onPress={() => handleAccountItemPress(item.id)}
                >
                    {item.icon}
                    <Text style={styles.accountItemText}>{item.title}</Text>
                </TouchableOpacity>
            </Card>
        </View>
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
                keyExtractor={(item) => item.id.toString()}
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
        backgroundColor: "#fff",
        padding: 16,
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
    cardContainer: {
        paddingVertical: 8,
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
