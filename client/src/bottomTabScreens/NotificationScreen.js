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

const NotificationScreen = () => {
    const notiItems = [
        {
            id: 1,
            title: "Sales",
            content: "khuyen mai rat nhieu tien",
            datetime: "04/07/2023 - 13:00",
        },
        {
            id: 2,
            title: "Sales",
            content: "khuyen mai rat nhieu tien",
            datetime: "04/07/2023 - 13:00",
        },
        {
            id: 3,
            title: "Sales",
            content: "khuyen mai rat nhieu tien",
            datetime: "04/07/2023 - 13:00",
        },
        {
            id: 4,
            title: "Sales",
            content: "khuyen mai rat nhieu tien",
            datetime: "04/07/2023 - 13:00",
        },
        {
            id: 5,
            title: "Sales",
            content: "khuyen mai rat nhieu tien",
            datetime: "04/07/2023 - 13:00",
        },
        {
            id: 6,
            title: "Sales",
            content: "khuyen mai rat nhieu tien",
            datetime: "04/07/2023 - 13:00",
        },
        {
            id: 7,
            title: "Sales",
            content: "khuyen mai rat nhieu tien",
            datetime: "04/07/2023 - 13:00",
        },
        {
            id: 8,
            title: "Sales",
            content: "khuyen mai rat nhieu tien",
            datetime: "04/07/2023 - 13:00",
        },
    ];

    const handleNotiPress = (id) => {
        console.log(id);
    };

    const renderNotiItems = ({ item }) => (
        <Card>
            <TouchableOpacity
                style={styles.notiItem}
                onPress={() => handleNotiPress(item.id)}
            >
                <View style={styles.title}>
                    <Text style={styles.titleHeader}>{item.title}</Text>
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
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notiItems}
                renderItem={renderNotiItems}
                keyExtractor={(item) => item.id}
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
        padding: 16,
        backgroundColor: "#fff",
    },
    notiList: {
        width: "100%",
    },
    notiItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default NotificationScreen;
