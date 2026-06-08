// components/VehicleTypeSelector.tsx

import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

import {
    router,
} from "expo-router";

import { theme } from "../../../../theme";

const vehicles = [
    {
        id: "auto",
        label: "Auto",
        image: require("../../../../assets/vehicles/auto.png"),
    },
    {
        id: "cab",
        label: "Cab",
        image: require("../../../../assets/vehicles/car.png"),
    },
    {
        id: "bike",
        label: "Bike",
        image: require("../../../../assets/vehicles/bike.png"),
    },
    {
        id: "truck",
        label: "Truck",
        image: require("../../../../assets/vehicles/truck.png"),
    },
];

export default function VehicleTypeSelector() {
    const handleVehicleSelect = (
        vehicleId: string
    ) => {
        router.push({
            pathname:
                "/bookingprocess",
            params: {
                vehicleType:
                    vehicleId,
                userId: "",
            },
        });
    };

    return (
        <View
            style={styles.container}
        >
            {vehicles.map(
                (vehicle) => (
                    <TouchableOpacity
                        key={
                            vehicle.id
                        }
                        activeOpacity={
                            0.8
                        }
                        onPress={() =>
                            handleVehicleSelect(
                                vehicle.id
                            )
                        }
                        style={
                            styles.vehicleButton
                        }
                    >
                        <Image
                            source={
                                vehicle.image
                            }
                            style={
                                styles.vehicleImage
                            }
                            resizeMode="contain"
                        />

                        <Text
                            style={
                                styles.vehicleText
                            }
                        >
                            {
                                vehicle.label
                            }
                        </Text>
                    </TouchableOpacity>
                )
            )}
        </View>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flexDirection:
                "row",

            justifyContent:
                "space-between",

            marginHorizontal:
                theme.SPACING
                    .lg,

            marginVertical:
                theme.SPACING
                    .md,
        },

        vehicleButton: {
            flex: 1,

            alignItems:
                "center",

            justifyContent:
                "center",

            marginHorizontal: 4,

            paddingVertical: 12,

            backgroundColor:
                theme.COLORS
                    .card,

            borderWidth: 1,

            borderColor:
                theme.COLORS
                    .border,

            borderRadius: 12,

            shadowColor:
                "#000",

            shadowOffset: {
                width: 0,
                height: 2,
            },

            shadowOpacity:
                0.05,

            shadowRadius: 4,

            elevation: 2,
        },

        vehicleImage: {
            width: 60,

            height: 60,

            marginBottom: 6,
        },

        vehicleText: {
            fontSize:
                theme
                    .FONT_SIZES
                    .sm,

            fontFamily:
                theme.FONT
                    .medium,

            color:
                theme.COLORS
                    .text,
        },
    });