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
                            size={36}
                            color="#111827"
                        />
                    );

                case "auto":
                    return (
                        <MaterialCommunityIcons
                            name="rickshaw"
                            size={36}
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
                        <MaterialCommunityIcons
                            name="truck"
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

    const selectedFare =
        fares.find(
            (
                fare
            ) =>
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

                {/* Vehicle Info */}

                <View
                    style={
                        styles.infoContainer
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
                            styles.metaText
                        }
                    >
                        Base Fare ₹
                        {
                            item.baseFare
                        }
                    </Text>

                    <Text
                        style={
                            styles.metaText
                        }
                    >
                        Distance ₹
                        {
                            item.distanceFare
                        }
                    </Text>

                    <Text
                        style={
                            styles.metaText
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
                        styles.priceContainer
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
                                    styles.selectedBadgeText
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
                <Ionicons
                    name="car-outline"
                    size={50}
                    color="#CBD5E1"
                />

                <Text
                    style={
                        styles.emptyText
                    }
                >
                    No rides available
                </Text>
            </View>
        );
    }

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
                        Book{" "}
                        {selectedFare.vehicleType
                            .charAt(
                                0
                            )
                            .toUpperCase() +
                            selectedFare.vehicleType.slice(
                                1
                            )}{" "}
                        • ₹
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
            paddingBottom: 90,
        },

        card: {
            flexDirection:
                "row",

            alignItems:
                "center",

            backgroundColor:
                "#FFFFFF",

            borderRadius: 18,

            padding: 16,

            marginBottom: 12,

            borderWidth: 1,

            borderColor:
                "#E5E7EB",

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

        selectedCard: {
            borderWidth: 2,

            borderColor:
                theme.COLORS
                    .primary,

            backgroundColor:
                "#FFFDF7",
        },

        iconContainer: {
            width: 64,

            height: 64,

            borderRadius: 32,

            backgroundColor:
                "#F8FAFC",

            justifyContent:
                "center",

            alignItems:
                "center",

            marginRight: 14,
        },

        infoContainer: {
            flex: 1,
        },

        vehicleName: {
            fontSize: 16,

            fontWeight:
                "700",

            color: "#111827",

            marginBottom: 6,
        },

        metaText: {
            fontSize: 12,

            color: "#64748B",

            marginBottom: 2,
        },

        priceContainer: {
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

            backgroundColor:
                "#DCFCE7",

            borderRadius: 10,

            paddingHorizontal: 8,

            paddingVertical: 4,
        },

        selectedBadgeText: {
            fontSize: 11,

            color: "#166534",

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

        emptyContainer: {
            flex: 1,

            justifyContent:
                "center",

            alignItems:
                "center",

            paddingVertical: 40,
        },

        emptyText: {
            marginTop: 12,

            fontSize: 15,

            color: "#94A3B8",
        },
    });