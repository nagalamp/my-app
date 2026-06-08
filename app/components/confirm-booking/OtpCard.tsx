import React from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

export default function OtpCard({
    otp,
}: {
    otp: string;
}) {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>
                Trip Start OTP
            </Text>

            <Text style={styles.otp}>
                {otp}
            </Text>

            <Text style={styles.hint}>
                Share this OTP with the driver
                before starting the trip
            </Text>
        </View>
    );
}

const styles =
    StyleSheet.create({
        card: {
            backgroundColor:
                "#FFFFFF",

            borderRadius: 16,

            paddingVertical: 16,

            paddingHorizontal: 20,

            alignItems:
                "center",

            borderWidth: 1,

            borderColor:
                "#F59E0B",

            shadowColor:
                "#000",

            shadowOffset: {
                width: 0,
                height: 2,
            },

            shadowOpacity: 0.05,

            shadowRadius: 4,

            elevation: 2,
        },

        label: {
            fontSize: 12,

            fontWeight: "600",

            color: "#6B7280",

            textTransform:
                "uppercase",

            letterSpacing: 1,
        },

        otp: {
            fontSize: 36,

            fontWeight: "800",

            color: "#111827",

            letterSpacing: 6,

            marginVertical: 8,
        },

        hint: {
            fontSize: 12,

            color: "#6B7280",

            textAlign: "center",

            lineHeight: 18,
        },
    });