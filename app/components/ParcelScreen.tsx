import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { theme } from "../../theme";

export default function ParcelScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                📦 Parcel
            </Text>

            <Text style={styles.subtitle}>
                Send and receive parcels
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