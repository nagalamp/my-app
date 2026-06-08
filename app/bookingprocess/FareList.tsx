// app/components/FareList.tsx

import React, {
    useState,
} from "react";

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import {
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

import { theme } from "../../theme";

export type FareItem = {
    vehicleType: string;

    baseFare: number;

    distanceFare: number;

    timeFare: number;

    totalFare: number;
};

type Props = {
    fares: FareItem[];

    selectedVehicle?: string;

    onSelectFare?: (
        fare: FareItem
    ) => void;

    onConfirmRide?: (
        fare: FareItem
    ) => void;
};

export default function FareList({
    fares,
    selectedVehicle,
    onSelectFare,
    onConfirmRide,
}: Props) {
    const [
        localSelected,
        setLocalSelected,
    ] = useState<
        string | null
    >(null);

    const selected =
        selectedVehicle ||
        localSelected;

    const getVehicleIcon =
        (
            vehicleType: string
        ) => {
            switch (
            vehicleType.toLowerCase()
            ) {
                case "bike":
                    return (
                        <MaterialCommunityIcons
                            name="motorbike"
                            size={34}
                            color="#111827"
                        />
                    );

                case "auto":
                    return (
                        <MaterialCommunityIcons
                            name="rickshaw"
                            size={34}
                            color="#111827"
                        />
                    );

                case "car":
                    return (
                        <Ionicons
                            name="car-sport"
                            size={34}
                            color="#111827"
                        />
                    );

                case "truck":
                    return (
                        <Ionicons
                            name="bus"
                            size={34}
                            color="#111827"
                        />
                    );

                default:
                    return (
                        <Ionicons
                            name="car"
                            size={34}
                            color="#111827"
                        />
                    );
            }
        };

    const renderItem = ({
        item,
    }: {
        item: FareItem;
    }) => {
        const isSelected =
            selected ===
            item.vehicleType;

        return (
            <TouchableOpacity
                activeOpacity={
                    0.85
                }
                style={[
                    styles.card,

                    isSelected &&
                    styles.selectedCard,
                ]}
                onPress={() => {
                    setLocalSelected(
                        item.vehicleType
                    );

                    onSelectFare?.(
                        item
                    );
                }}
            >
                {/* Vehicle Icon */}

                <View
                    style={
                        styles.iconContainer
                    }
                >
                    {getVehicleIcon(
                        item.vehicleType
                    )}
                </View>

                {/* Vehicle Details */}

                <View
                    style={
                        styles.details
                    }
                >
                    <Text
                        style={
                            styles.vehicleName
                        }
                    >
                        {item.vehicleType
                            .charAt(
                                0
                            )
                            .toUpperCase() +
                            item.vehicleType.slice(
                                1
                            )}
                    </Text>

                    <Text
                        style={
                            styles.subText
                        }
                    >
                        Base Fare ₹
                        {
                            item.baseFare
                        }
                    </Text>

                    <Text
                        style={
                            styles.subText
                        }
                    >
                        Distance ₹
                        {
                            item.distanceFare
                        }
                    </Text>

                    <Text
                        style={
                            styles.subText
                        }
                    >
                        Time ₹
                        {
                            item.timeFare
                        }
                    </Text>
                </View>

                {/* Fare */}

                <View
                    style={
                        styles.fareSection
                    }
                >
                    <Text
                        style={
                            styles.totalFare
                        }
                    >
                        ₹
                        {
                            item.totalFare
                        }
                    </Text>

                    {isSelected && (
                        <View
                            style={
                                styles.selectedBadge
                            }
                        >
                            <Text
                                style={
                                    styles.selectedText
                                }
                            >
                                Selected
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const selectedFare =
        fares.find(
            (
                fare
            ) =>
                fare.vehicleType ===
                selected
        );

    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <FlatList
                data={fares}
                keyExtractor={(
                    item
                ) =>
                    item.vehicleType
                }
                renderItem={
                    renderItem
                }
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.listContent
                }
            />

            {selectedFare && (
                <TouchableOpacity
                    style={
                        styles.confirmButton
                    }
                    onPress={() =>
                        onConfirmRide?.(
                            selectedFare
                        )
                    }
                >
                    <Text
                        style={
                            styles.confirmButtonText
                        }
                    >
                        Continue with{" "}
                        {
                            selectedFare.vehicleType
                        }
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles =
    StyleSheet.create({
        listContent: {
            paddingBottom: 100,
        },

        card: {
            flexDirection:
                "row",

            alignItems:
                "center",

            backgroundColor:
                "#FFFFFF",

            borderRadius: 16,

            padding: 16,

            marginBottom: 12,

            borderWidth: 1,

            borderColor:
                "#E5E7EB",
        },

        selectedCard: {
            borderColor:
                theme.COLORS
                    .primary,

            borderWidth: 2,

            backgroundColor:
                "#FFFDF5",
        },

        iconContainer: {
            width: 60,

            height: 60,

            borderRadius: 30,

            justifyContent:
                "center",

            alignItems:
                "center",

            backgroundColor:
                "#F8FAFC",

            marginRight: 14,
        },

        details: {
            flex: 1,
        },

        vehicleName: {
            fontSize: 16,

            fontWeight:
                "700",

            color: "#111827",

            marginBottom: 6,
        },

        subText: {
            fontSize: 12,

            color: "#64748B",

            marginBottom: 2,
        },

        fareSection: {
            alignItems:
                "flex-end",
        },

        totalFare: {
            fontSize: 22,

            fontWeight:
                "700",

            color:
                theme.COLORS
                    .primary,
        },

        selectedBadge: {
            marginTop: 6,

            paddingHorizontal: 10,

            paddingVertical: 4,

            borderRadius: 10,

            backgroundColor:
                "#DCFCE7",
        },

        selectedText: {
            color: "#166534",

            fontSize: 11,

            fontWeight:
                "700",
        },

        confirmButton: {
            position:
                "absolute",

            bottom: 0,

            left: 0,

            right: 0,

            height: 58,

            borderRadius: 14,

            justifyContent:
                "center",

            alignItems:
                "center",

            backgroundColor:
                theme.COLORS
                    .primary,
        },

        confirmButtonText: {
            color: "#FFFFFF",

            fontSize: 16,

            fontWeight:
                "700",
        },
    });