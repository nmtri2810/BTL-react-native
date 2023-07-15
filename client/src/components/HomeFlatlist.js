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

const HomeFlatlist = ({ items, listHeaderText, numOfCol, offers }) => {
    const renderItems = ({ item }) => (
        <View style={numOfCol === 2 && styles.cardContainer}>
            <Card>
                <TouchableOpacity>
                    <Image
                        style={styles.image}
                        source={{
                            uri: item.imageUrl,
                        }}
                        resizeMode="cover"
                    />
                    <Text numberOfLines={2} style={styles.title}>
                        {item.title}
                    </Text>
                    {offers === true && (
                        <View style={styles.datetimeContainer}>
                            <Text style={styles.datetime}>{item.datetime}</Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Details</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </TouchableOpacity>
            </Card>
        </View>
    );

    return (
        <View>
            <Text style={styles.listHeaderText}>{listHeaderText}</Text>
            <FlatList
                data={items}
                renderItem={renderItems}
                keyExtractor={(item) => item.id}
                numColumns={numOfCol}
                style={styles.list}
                scrollEnabled={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listHeaderText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 16,
    },
    list: {
        width: "100%",
    },
    cardContainer: {
        width: "50%",
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 15,
        alignSelf: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 4,
    },
    datetimeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    datetime: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#999",
    },
    button: {
        width: 60,
        height: 30,
        backgroundColor: "#eab849",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 12,
    },
});

export default HomeFlatlist;
