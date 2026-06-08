// components/VehicleTypeSelector.tsx

import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { router } from "expo-router";

import { theme } from "../../../../theme";

const vehicles = [
    {
        id: "auto",
        label: "Auto",
        icon: "rickshaw",
    },
    {
        id: "cab",
        label: "Cab",
        icon: "car",
    },
    {
        id: "bike",
        label: "Bike",
        icon: "motorbike",
    },
    {
        id: "truck",
        label: "Truck",
        icon: "truck",
    },
];

export default function VehicleTypeSelector() {
    const [selected, setSelected] = useState("cab");

    const handleVehicleSelect = (vehicleId: string) => {
        setSelected(vehicleId);

        router.push({
            pathname: "/bookingprocess",
            params: {
                vehicleType: "",
                userId: ""
            },
        });
    };

    return (
        <View style={styles.container}>
            {vehicles.map((vehicle) => {
                const isSelected = selected === vehicle.id;

                return (
                    <TouchableOpacity
                        key={vehicle.id}
                        activeOpacity={0.8}
                        onPress={() =>
                            handleVehicleSelect(vehicle.id)
                        }
                        style={[
                            styles.vehicleButton,
                            isSelected && styles.selectedButton,
                        ]}
                    >
                        <MaterialCommunityIcons
                            name={vehicle.icon as any}
                            size={22}
                            color={
                                isSelected
                                    ? theme.COLORS.white
                                    : theme.COLORS.text
                            }
                        />

                        <Text
                            style={[
                                styles.vehicleText,
                                isSelected &&
                                styles.selectedVehicleText,
                            ]}
                        >
                            {vehicle.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: theme.SPACING.lg,
        marginVertical: theme.SPACING.md,
    },

    vehicleButton: {
        flex: 1,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        marginHorizontal: 4,

        paddingVertical: 12,

        backgroundColor: "#F3F4F6",

        borderWidth: 1,
        borderColor: "#E5E7EB",

        borderRadius: 10,
    },

    selectedButton: {
        backgroundColor: theme.COLORS.primary,
        borderColor: theme.COLORS.primary,

        elevation: 4,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },

    vehicleText: {
        marginLeft: 6,

        fontSize: theme.FONT_SIZES.sm,

        fontFamily: theme.FONT.medium,

        color: theme.COLORS.black,
    },

    selectedVehicleText: {
        color: theme.COLORS.black,

        fontFamily: theme.FONT.bold,
    },
});