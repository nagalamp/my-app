// components/WhereToGoBox.tsx

import React from "react";

import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import { theme } from "../../../../theme";

export default function WhereToGoBox() {
    const handlePress = () => {
        //router.push("/bookingprocess");
        router.push({
            pathname: "/bookingprocess",
            params: {
                vehicleType: "",
                userId: ""
            },
        });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={styles.container}
            onPress={handlePress}
        >
            <Ionicons
                name="search"
                size={22}
                color={theme.COLORS.gray500}
                style={styles.searchIcon}
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    Where to go?
                </Text>

                <Text style={styles.subtitle}>
                    Search destination
                </Text>
            </View>

            <Ionicons
                name="location-outline"
                size={22}
                color={theme.COLORS.secondary}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 64,

        marginHorizontal: 16,

        marginTop: 12,

        backgroundColor:
            theme.COLORS.white,

        borderRadius: 16,

        borderWidth: 1.5,

        borderColor:
            theme.COLORS.border,

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 16,

        ...theme.SHADOWS.small,
    },

    searchIcon: {
        marginRight: 12,
    },

    content: {
        flex: 1,
    },

    title: {
        fontFamily:
            theme.FONT.bold,

        fontSize: 16,

        color:
            theme.COLORS.text,
    },

    subtitle: {
        marginTop: 2,

        fontFamily:
            theme.FONT.medium,

        fontSize: 12,

        color:
            theme.COLORS.gray500,
    },
});