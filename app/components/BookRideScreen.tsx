import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { theme } from "../../theme";

export default function BookRideScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                🚖 Book Rides
            </Text>

            <Text style={styles.subtitle}>
                Search and book rides
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: "center",

        alignItems: "center",
    },

    title: {
        fontFamily:
            theme.FONT.bold,

        fontSize:
            theme.FONT_SIZES.xxl,

        color:
            theme.COLORS.text,
    },

    subtitle: {
        marginTop: 10,

        fontFamily:
            theme.FONT.medium,

        color:
            theme.COLORS.textSecondary,
    },
});