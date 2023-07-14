import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import HomeFlatlist from "../components/HomeFlatlist";
import { offers, news } from "../data/homeItems";

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View>
                    <Image
                        source={{
                            uri: "https://websitecukcukvn.misacdn.net/wp-content/uploads/2022/03/4321-min.png?fbclid=IwAR2JBfhQMLCDwZCK5-f9sKZ6vySbpj5T2MEuOty0SL9s1t2r7o0w8M3RY1o",
                        }}
                        style={styles.image}
                    />
                    <Text style={styles.introText}>
                        Welcome to TP Restaurant, where we bring you an
                        exquisite culinary experience and a luxurious ambiance.
                        With a diverse range of dishes and unique style, we take
                        pride in being an ideal destination for food
                        enthusiasts.
                    </Text>
                </View>
                <HomeFlatlist
                    items={offers}
                    listHeaderText="Super Deals"
                    numOfCol={2}
                    offers={true}
                />
                <HomeFlatlist items={news} listHeaderText="Featured News" />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
    },
    contentContainer: {
        padding: 16,
    },
    image: {
        width: "100%",
        height: 220,
        resizeMode: "cover",
    },
    introText: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 4,
        textAlign: "left",
    },
});

export default HomeScreen;
