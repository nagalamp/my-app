// components/TopSwitchTabs.tsx

import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../../../theme";

interface Props {
    activeTab: "book" | "parcel";
    onChange: (tab: "book" | "parcel") => void;
}

export default function TopSwitchTabs({
    activeTab,
    onChange,
}: Props) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[
                        styles.card,
                        activeTab === "book" &&
                        styles.activeCard,
                    ]}
                    onPress={() => onChange("book")}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="car"
                        size={22}
                        color={
                            activeTab === "book"
                                ? theme.COLORS.white
                                : theme.COLORS.secondary
                        }
                    />

                    <Text
                        style={[
                            styles.title,
                            activeTab === "book" &&
                            styles.activeText,
                        ]}
                    >
                        Book a Ride
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            activeTab === "book" &&
                            styles.activeSubText,
                        ]}
                    >
                        Fast & affordable
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.card,
                        activeTab === "parcel" &&
                        styles.activeCard,
                    ]}
                    onPress={() => onChange("parcel")}
                    activeOpacity={0.8}
                >
                    <Ionicons
                        name="cube"
                        size={22}
                        color={
                            activeTab === "parcel"
                                ? theme.COLORS.white
                                : theme.COLORS.secondary
                        }
                    />

                    <Text
                        style={[
                            styles.title,
                            activeTab === "parcel" &&
                            styles.activeText,
                        ]}
                    >
                        Parcel
                    </Text>

                    <Text
                        style={[
                            styles.subtitle,
                            activeTab === "parcel" &&
                            styles.activeSubText,
                        ]}
                    >
                        Door-to-door
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#ffffff",
    },

    container: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#00000",
    },

    card: {
        flex: 1,

        height: 100,

        backgroundColor: theme.COLORS.white,

        borderRadius: 16,

        padding: 20,

        borderWidth: 1,

        borderColor: theme.COLORS.gray200,

        justifyContent: "center",

        ...theme.SHADOWS.small,
    },

    activeCard: {
        backgroundColor: theme.COLORS.secondary,

        borderColor: theme.COLORS.secondary,
    },

    title: {
        marginTop: 6,

        fontSize: theme.FONT_SIZES.md,

        fontFamily: theme.FONT.bold,

        color: theme.COLORS.text,
    },

    subtitle: {
        marginTop: 2,

        fontSize: theme.FONT_SIZES.xs,

        fontFamily: theme.FONT.medium,

        color: theme.COLORS.textSecondary,
    },

    activeText: {
        color: theme.COLORS.white,
    },

    activeSubText: {
        color: theme.COLORS.white,
    },
});