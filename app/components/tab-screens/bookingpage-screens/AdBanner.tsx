// components/AdBanner.tsx

import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../../../theme";

export default function AdBanner() {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.container}
        >
            <View style={styles.leftSection}>
                <Text style={styles.offer}>
                    50% OFF
                </Text>

                <Text style={styles.title}>
                    Festival Specialsss
                </Text>

                <Text style={styles.subtitle}>
                    Book your ride now and save more
                </Text>
            </View>

            <View style={styles.iconContainer}>
                <Ionicons
                    name="gift"
                    size={40}
                    color="#FFFFFF"
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: theme.SPACING.lg,
        marginVertical: theme.SPACING.md,

        padding: 18,

        borderRadius: 20,

        backgroundColor: theme.COLORS.primary,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,

        elevation: 4,
    },

    leftSection: {
        flex: 1,
    },

    offer: {
        color: "#FFFFFF",

        fontSize: 26,

        fontFamily: theme.FONT.bold,
    },

    title: {
        marginTop: 4,

        color: "#FFFFFF",

        fontSize: 16,

        fontFamily: theme.FONT.bold,
    },

    subtitle: {
        marginTop: 4,

        color: "rgba(255,255,255,0.9)",

        fontSize: 13,

        fontFamily: theme.FONT.medium,
    },

    iconContainer: {
        width: 70,
        height: 70,

        borderRadius: 35,

        backgroundColor: "rgba(255,255,255,0.15)",

        justifyContent: "center",
        alignItems: "center",
    },
});