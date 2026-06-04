import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { theme } from "../../theme";

interface Props {
    activeTab: "book" | "parcel";
    onChange: (
        tab: "book" | "parcel"
    ) => void;
}

export default function TopSwitchTabs({
    activeTab,
    onChange,
}: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === "book" &&
                    styles.activeTab,
                ]}
                onPress={() =>
                    onChange("book")
                }
            >
                <Text
                    style={[
                        styles.tabText,
                        activeTab === "book" &&
                        styles.activeText,
                    ]}
                >
                    Book
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === "parcel" &&
                    styles.activeTab,
                ]}
                onPress={() =>
                    onChange("parcel")
                }
            >
                <Text
                    style={[
                        styles.tabText,
                        activeTab ===
                        "parcel" &&
                        styles.activeText,
                    ]}
                >
                    Parcel
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",

        margin: 16,

        backgroundColor:
            theme.COLORS.gray100,

        borderRadius:
            theme.RADIUS.round,

        padding: 4,
    },

    tab: {
        flex: 1,

        height: 46,

        justifyContent: "center",

        alignItems: "center",

        borderRadius:
            theme.RADIUS.round,
    },

    activeTab: {
        backgroundColor:
            theme.COLORS.secondary,
    },

    tabText: {
        fontFamily:
            theme.FONT.medium,

        color:
            theme.COLORS.textSecondary,
    },

    activeText: {
        color:
            theme.COLORS.white,

        fontFamily:
            theme.FONT.bold,
    },
});