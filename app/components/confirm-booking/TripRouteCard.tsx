import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

type Props = {
    pickup: string;
    drop: string;
};

export default function TripRouteCard({
    pickup,
    drop,
}: Props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>
                Trip Route
            </Text>

            <View style={styles.row}>
                <View
                    style={
                        styles.iconContainer
                    }
                >
                    <Ionicons
                        name="ellipse"
                        size={12}
                        color="#22C55E"
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Text
                        style={
                            styles.label
                        }
                    >
                        Pickup
                    </Text>

                    <Text
                        style={
                            styles.address
                        }
                        numberOfLines={
                            2
                        }
                    >
                        {pickup}
                    </Text>
                </View>
            </View>

            <View
                style={
                    styles.line
                }
            />

            <View style={styles.row}>
                <View
                    style={
                        styles.iconContainer
                    }
                >
                    <Ionicons
                        name="location"
                        size={14}
                        color="#EF4444"
                    />
                </View>

                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Text
                        style={
                            styles.label
                        }
                    >
                        Drop
                    </Text>

                    <Text
                        style={
                            styles.address
                        }
                        numberOfLines={
                            2
                        }
                    >
                        {drop}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles =
    StyleSheet.create({
        card: {
            backgroundColor:
                "#FFFFFF",

            borderRadius: 16,

            padding: 14,

            borderWidth: 1,

            borderColor:
                "#E5E7EB",
        },

        title: {
            fontSize: 13,

            fontWeight:
                "700",

            color:
                "#111827",

            marginBottom: 12,
        },

        row: {
            flexDirection:
                "row",

            alignItems:
                "flex-start",
        },

        iconContainer: {
            width: 20,

            alignItems:
                "center",

            marginTop: 2,
        },

        label: {
            fontSize: 11,

            fontWeight:
                "600",

            color:
                "#6B7280",
        },

        address: {
            fontSize: 12,

            color:
                "#111827",

            marginTop: 2,

            lineHeight: 18,
        },

        line: {
            width: 1,

            height: 20,

            backgroundColor:
                "#D1D5DB",

            marginLeft: 6,

            marginVertical: 4,
        },
    });