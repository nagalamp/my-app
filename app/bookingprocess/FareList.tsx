// app/components/FareList.tsx

import React, {
    useState,
} from "react";

import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import {
    Ionicons,
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

    const getVehicleImage = (
        vehicleType: string
    ) => {
        switch (
        vehicleType.toLowerCase()
        ) {
            case "bike":
                return require(
                    "../../assets/vehicles/bike.png"
                );

            case "auto":
                return require(
                    "../../assets/vehicles/auto.png"
                );

            case "car":
                return require(
                    "../../assets/vehicles/car.png"
                );

            case "truck":
                return require(
                    "../../assets/vehicles/truck.png"
                );

            default:
                return require(
                    "../../assets/vehicles/car.png"
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
                <View
                    style={
                        styles.iconContainer
                    }
                >
                    <Image
                        source={getVehicleImage(
                            item.vehicleType
                        )}
                        style={
                            styles.vehicleImage
                        }
                        resizeMode="contain"
                    />
                </View>

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
                            .charAt(0)
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
                        Base ₹
                        {
                            item.baseFare
                        }{" "}
                        • Distance ₹
                        {
                            item.distanceFare
                        }{" "}
                        • Time ₹
                        {
                            item.timeFare
                        }
                    </Text>
                </View>

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
                            .charAt(0)
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
            paddingBottom: 80,
        },

        card: {
            flexDirection:
                "row",

            alignItems:
                "center",

            backgroundColor:
                "#FFFFFF",

            borderRadius: 12,

            paddingVertical: 8,

            paddingHorizontal: 10,

            marginBottom: 6,

            borderWidth: 1,

            borderColor:
                "#E5E7EB",
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
            width: 52,

            height: 52,

            justifyContent:
                "center",

            alignItems:
                "center",

            marginRight: 10,
        },

        vehicleImage: {
            width: 50,

            height: 100,
        },

        infoContainer: {
            flex: 1,
        },

        vehicleName: {
            fontSize: 14,

            fontWeight:
                "700",

            color: "#111827",

            marginBottom: 2,
        },

        metaText: {
            fontSize: 11,

            color: "#64748B",
        },

        priceContainer: {
            alignItems:
                "flex-end",
        },

        totalFare: {
            fontSize: 18,

            fontWeight:
                "800",

            color:
                theme.COLORS
                    .primary,
        },

        selectedBadge: {
            marginTop: 4,

            backgroundColor:
                "#DCFCE7",

            borderRadius: 8,

            paddingHorizontal: 6,

            paddingVertical: 2,
        },

        selectedBadgeText: {
            fontSize: 10,

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

            height: 52,

            borderRadius: 12,

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

            fontSize: 15,

            fontWeight:
                "800",
        },

        emptyContainer: {
            flex: 1,

            justifyContent:
                "center",

            alignItems:
                "center",

            paddingVertical: 30,
        },

        emptyText: {
            marginTop: 8,

            fontSize: 14,

            color: "#94A3B8",
        },
    });