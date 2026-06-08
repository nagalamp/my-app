import React from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

type Props = {
    driverName: string;
    driverPhone: string;
    driverRating?: string;
    vehicleNumber: string;
    vehicleName: string;
    eta?: string;
    driverImage?: string;
};

export default function DriverAssignedCard({
    driverName,
    driverPhone,
    driverRating = "4.9",
    vehicleNumber,
    vehicleName,
    eta = "3 mins",
    driverImage,
}: Props) {
    const handleCall = () => {
        Linking.openURL(
            `tel:${driverPhone}`
        );
    };

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Ionicons
                    name="person-circle"
                    size={18}
                    color="#10B981"
                />

                <Text style={styles.title}>
                    Driver Assigned
                </Text>
            </View>

            <View style={styles.driverRow}>
                <Image
                    source={{
                        uri:
                            driverImage ||
                            "https://i.pravatar.cc/150?img=12",
                    }}
                    style={styles.avatar}
                />

                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <Text
                        style={
                            styles.driverName
                        }
                    >
                        {driverName}
                    </Text>

                    <Text
                        style={
                            styles.meta
                        }
                    >
                        ⭐{" "}
                        {driverRating} • ⏱{" "}
                        {eta}
                    </Text>
                </View>

                <TouchableOpacity
                    style={
                        styles.callButton
                    }
                    onPress={
                        handleCall
                    }
                >
                    <Ionicons
                        name="call"
                        size={14}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>

            <View
                style={
                    styles.vehicleRow
                }
            >
                <Ionicons
                    name="car"
                    size={16}
                    color="#F59E0B"
                />

                <Text
                    style={
                        styles.vehicleText
                    }
                >
                    {vehicleName} •{" "}
                    {vehicleNumber}
                </Text>
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

        header: {
            flexDirection:
                "row",

            alignItems:
                "center",

            marginBottom: 12,
        },

        title: {
            marginLeft: 6,

            fontSize: 13,

            fontWeight:
                "700",

            color:
                "#111827",
        },

        driverRow: {
            flexDirection:
                "row",

            alignItems:
                "center",
        },

        avatar: {
            width: 44,

            height: 44,

            borderRadius: 22,

            marginRight: 10,
        },

        driverName: {
            fontSize: 14,

            fontWeight:
                "700",

            color:
                "#111827",
        },

        meta: {
            fontSize: 11,

            color:
                "#6B7280",

            marginTop: 2,
        },

        callButton: {
            width: 34,

            height: 34,

            borderRadius: 17,

            backgroundColor:
                "#10B981",

            justifyContent:
                "center",

            alignItems:
                "center",
        },

        vehicleRow: {
            flexDirection:
                "row",

            alignItems:
                "center",

            marginTop: 12,

            paddingTop: 12,

            borderTopWidth: 1,

            borderTopColor:
                "#F3F4F6",
        },

        vehicleText: {
            marginLeft: 8,

            fontSize: 12,

            fontWeight:
                "600",

            color:
                "#374151",
        },
    });