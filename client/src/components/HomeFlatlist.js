import React from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Card from "./Card";

const HomeFlatlist = ({ items }) => {
    const handlePress = (id) => {
        console.log(id);
    };

    const renderItems = ({ item }) => (
        <Card>
            <TouchableOpacity
                style={styles.item}
                onPress={() => handlePress(item.id)}
            >
                <Image
                    style={styles.image}
                    source={{
                        uri: item.imageUrl,
                    }}
                />
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.datetimeContainer}>
                    <Text style={styles.datetime}>{item.datetime}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Xem</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Card>
    );

    return (
        <FlatList
            data={items}
            renderItem={renderItems}
            keyExtractor={(item) => item.id}
            style={styles.list}
        />
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
    list: {
        width: "100%",
    },
    item: {
        width: "100%",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    datetimeContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    datetime: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#999",
    },
    button: {
        height: 50,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default HomeFlatlist;
