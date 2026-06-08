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

import { theme } from "../../../theme";

export default function AppHeader() {
    return (
        <SafeAreaView
            edges={["top"]}
            style={styles.safeArea}
        >
            <View style={styles.shadowContainer}>
                <View style={styles.container}>
                    <Image
                        source={require("../../../assets/images/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.title}>
                        GaadiGuru
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "#FFD400",
    },

    shadowContainer: {
        backgroundColor: "#FFD400",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,

        elevation: 8,
    },

    container: {
        height: 60,

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: theme.SPACING.lg,

        backgroundColor: "#FFD400",
    },

    logo: {
        width: 40,
        height: 40,

        marginRight: theme.SPACING.sm,
    },

    title: {
        fontSize: theme.FONT_SIZES.xl,

        fontFamily: theme.FONT.bold,

        color: "#000000",
    },
});