import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import Card from "../components/Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { notiItems } from "../data/notiItems";
import Title from "../components/Title";

const NotificationScreen = () => {
    const renderNotiItems = ({ item }) => (
        <View style={styles.cardContainer}>
            <Card shadow={true}>
                <TouchableOpacity style={styles.notiItem}>
                    <View style={styles.title}>
                        <View style={styles.titleContainer}>
                            <MaterialCommunityIcons
                                name={item.icon}
                                color="#eab849"
                                size={24}
                                style={styles.notificationIcon}
                            />
                            <Text style={styles.titleHeader}>{item.title}</Text>
                        </View>
                        <MaterialCommunityIcons
                            name="dots-horizontal"
                            color="black"
                            size={26}
                        />
                    </View>
                    <Text style={styles.content}>{item.content}</Text>
                    <Text style={styles.datetime}>{item.datetime}</Text>
                </TouchableOpacity>
            </Card>
        </View>
    );

    return (
        <View style={styles.container}>
            <Title title="Notification" />
            <FlatList
                data={notiItems}
                renderItem={renderNotiItems}
                keyExtractor={(item) => item.id.toString()}
                style={styles.notiList}
            />
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
        paddingBottom: 16,
    },
    notiList: {
        width: "100%",
        flex: 1,
    },
    cardContainer: {
        padding: 10,
    },
    notiItem: {
        padding: 10,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleContainer: {
        flexDirection: "row",
    },
    titleHeader: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    content: {
        fontSize: 16,
        marginBottom: 8,
    },
    datetime: {
        fontSize: 14,
        color: "gray",
    },
});

export default NotificationScreen;
