// app/components/FareList.tsx

import React, { useState } from "react";

import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";

import {
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

    const getVehicleIcon = (
        vehicleType: string
    ) => {
        switch (
        vehicleType?.toLowerCase()
        ) {
            case "bike":
                return "motorbike";

            case "auto":
                return "rickshaw";

            case "truck":
                return "truck";

            case "car":
            default:
                return "car";
        }
    };

    const selectedFare =
        fares.find(
            (fare) =>
                fare.vehicleType ===
                selected
        );

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
                    0.8
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
                <View
                    style={
                        styles.iconContainer
                    }
                >
                    <MaterialCommunityIcons
                        name={
                            getVehicleIcon(
                                item.vehicleType
                            ) as any
                        }
                        size={36}
                        color={
                            theme.COLORS
                                .primary
                        }
                    />
                </View>

                <View
                    style={
                        styles.leftSection
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
                        Base Fare: ₹
                        {
                            item.baseFare
                        }
                    </Text>

                    <Text
                        style={
                            styles.subText
                        }
                    >
                        Distance Fare:
                        ₹
                        {Math.round(
                            item.distanceFare
                        )}
                    </Text>

                    <Text
                        style={
                            styles.subText
                        }
                    >
                        Time Fare: ₹
                        {Math.round(
                            item.timeFare
                        )}
                    </Text>
                </View>

                <View
                    style={
                        styles.rightSection
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
                        <Text
                            style={
                                styles.selectedText
                            }
                        >
                            ✓ Selected
                        </Text>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    if (
        !fares ||
        fares.length === 0
    ) {
        return (
            <View
                style={
                    styles.emptyContainer
                }
            >
                <Text
                    style={
                        styles.emptyText
                    }
                >
                    No fares available
                </Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
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
                        Confirm Ride • ₹
                        {
                            selectedFare.totalFare
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
            paddingBottom: 10,
        },

        card: {
            backgroundColor:
                theme.COLORS
                    .white,

            borderRadius: 16,

            padding:
                theme.SPACING
                    .md,

            marginBottom:
                theme.SPACING
                    .sm,

            flexDirection:
                "row",

            alignItems:
                "center",

            borderWidth: 1,

            borderColor:
                theme.COLORS
                    .border,

            shadowColor:
                "#000",

            shadowOffset: {
                width: 0,
                height: 2,
            },

            shadowOpacity:
                0.08,

            shadowRadius: 4,

            elevation: 2,
        },

        selectedCard: {
            borderColor:
                theme.COLORS
                    .primary,

            borderWidth: 2,

            backgroundColor:
                "#FFFDF2",
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
                "#F3F4F6",

            marginRight: 12,
        },

        leftSection: {
            flex: 1,
        },

        rightSection: {
            alignItems:
                "flex-end",
        },

        vehicleName: {
            fontSize:
                theme
                    .FONT_SIZES
                    .lg,

            fontWeight:
                "700",

            color:
                theme.COLORS
                    .text,

            marginBottom: 6,
        },

        subText: {
            fontSize:
                theme
                    .FONT_SIZES
                    .sm,

            color:
                theme.COLORS
                    .text,

            opacity: 0.7,

            marginBottom: 2,
        },

        totalFare: {
            fontSize: 24,

            fontWeight:
                "700",

            color:
                theme.COLORS
                    .primary,
        },

        selectedText: {
            marginTop: 4,

            color:
                theme.COLORS
                    .success,

            fontWeight:
                "700",
        },

        confirmButton: {
            height: 56,

            borderRadius: 14,

            justifyContent:
                "center",

            alignItems:
                "center",

            backgroundColor:
                theme.COLORS
                    .primary,

            marginTop: 10,
        },

        confirmButtonText: {
            color:
                theme.COLORS
                    .white,

            fontSize: 16,

            fontWeight:
                "700",
        },

        emptyContainer: {
            flex: 1,

            justifyContent:
                "center",

            alignItems:
                "center",
        },

        emptyText: {
            fontSize:
                theme
                    .FONT_SIZES
                    .md,

            color:
                theme.COLORS
                    .text,
        },
    });