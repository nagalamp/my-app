// components/PlacesSlider.tsx

import React from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";

import { router } from "expo-router";

import { theme } from "../../../../theme";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.45;

const places = [
    {
        id: "1",
        title: "Sri Doddabasava Temple",
        image:
            "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1000",
    },
    {
        id: "2",
        title: "K. R. Market",
        image:
            "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1000",
    },
    {
        id: "3",
        title: "Lalbagh Botanical Garden",
        image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000",
    },
    {
        id: "4",
        title: "Cubbon Park",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000",
    },
];

export default function PlacesSlider() {
    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
        // onPress={() =>
        //     router.push("/location-picker")
        // }
        >
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />

            <Text
                numberOfLines={2}
                style={styles.title}
            >
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Go Places with GaadiGuru
            </Text>

            <FlatList
                horizontal
                data={places}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={
                    styles.listContainer
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        marginHorizontal: theme.SPACING.lg,
        marginVertical: theme.SPACING.md,
    },

    heading: {
        fontSize: 14,
        fontFamily: theme.FONT.bold,
        color: theme.COLORS.text,

        paddingHorizontal: theme.SPACING.lg,
        marginBottom: theme.SPACING.md,
    },

    listContainer: {
        paddingLeft: theme.SPACING.lg,
        paddingRight: theme.SPACING.sm,
    },

    card: {
        width: CARD_WIDTH,
        marginRight: 12,
    },

    image: {
        width: "100%",
        height: 100,

        borderRadius: 18,

        backgroundColor: "#E5E7EB",
    },

    title: {
        marginTop: 8,

        fontSize: 10,

        lineHeight: 20,

        color: theme.COLORS.text,

        fontFamily: theme.FONT.bold,
    },
});