import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import { theme } from "../../theme";

export default function AppHeader() {
    return (
        <SafeAreaView
            edges={["top"]}
            style={styles.safeArea}
        >
            <View style={styles.container}>
                <Image
                    source={require("../../assets/images/logo.png")}
                    style={styles.logo}
                />

                <Text style={styles.title}>
                    Gaadiguru
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor:
            theme.COLORS.white,
    },

    container: {
        height: 60,

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 16,

        backgroundColor:
            theme.COLORS.white,

        borderBottomWidth: 1,

        borderBottomColor:
            theme.COLORS.gray200,
    },

    logo: {
        width: 36,

        height: 36,

        marginRight: 10,
    },

    title: {
        fontSize:
            theme.FONT_SIZES.lg,

        fontFamily:
            theme.FONT.bold,

        color:
            theme.COLORS.text,
    },
});