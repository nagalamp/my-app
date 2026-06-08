import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

export default function BookingHeader({
    bookingNumber,
}: {
    bookingNumber: string;
}) {
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                <Ionicons
                    name="checkmark"
                    size={24}
                    color="#FFFFFF"
                />
            </View>

            <Text style={styles.title}>
                Ride Confirmed
            </Text>

            <Text style={styles.subtitle}>
                Booking ID
            </Text>

            <Text style={styles.booking}>
                {bookingNumber}
            </Text>
        </View>
    );
}

const styles =
    StyleSheet.create({
        container: {
            alignItems: "center",
            marginBottom: 12,
        },

        icon: {
            width: 52,
            height: 52,
            borderRadius: 26,

            backgroundColor:
                "#22C55E",

            justifyContent:
                "center",

            alignItems:
                "center",

            marginBottom: 8,
        },

        title: {
            fontSize: 20,

            fontWeight: "700",

            color: "#111827",
        },

        subtitle: {
            fontSize: 12,

            color: "#6B7280",

            marginTop: 4,
        },

        booking: {
            fontSize: 14,

            fontWeight: "700",

            color: "#F59E0B",

            marginTop: 2,
        },
    });