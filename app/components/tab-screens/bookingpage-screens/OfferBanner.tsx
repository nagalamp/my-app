// components/OfferBanner.tsx

import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../theme";

export default function OfferBanner() {
    return (
        <View style={styles.container}>
            <Ionicons
                name="pricetag-outline"
                size={18}
                color={theme.COLORS.primary}
            />

            <Text style={styles.text}>
                Get <Text style={styles.highlight}>50% Discount</Text> on Festival Season
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flexDirection: "row",
        alignItems: "center",
        //marginHorizontal: theme.SPACING.lg,
        marginVertical: theme.SPACING.xs,
        marginTop: 2

    },

    text: {
        //marginLeft: 8,
        fontSize: theme.FONT_SIZES.md,
        fontFamily: theme.FONT.medium,
        color: theme.COLORS.text,
        marginHorizontal: 0,
    },

    highlight: {
        color: theme.COLORS.primary,
        fontFamily: theme.FONT.bold,
    },
});