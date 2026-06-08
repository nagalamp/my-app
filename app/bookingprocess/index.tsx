// app/components/Sample.tsx

import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import LocationInput, {
    LocationType,
} from "./LocationInput";

import RecentLocations, {
    SavedRoute,
} from "./RecentLocations";

import ConfirmPickupLocationModal from "./ConfirmDropLocationModal";

import RouteMap, {
    FareItem,
} from "./RouteMap";

import FareList from "./FareList";

import { theme } from "../../theme";

const recentRoutes: SavedRoute[] = [
    {
        id: "1",
        title: "Home → Office",

        pickup: {
            address:
                "Kengeri, Bengaluru",
            latitude:
                12.8996676,
            longitude:
                77.4826837,
        },

        drop: {
            address:
                "Electronic City, Bengaluru",
            latitude:
                12.839935,
            longitude:
                77.677032,
        },
    },

    {
        id: "2",
        title:
            "Office → Airport",

        pickup: {
            address:
                "Electronic City, Bengaluru",
            latitude:
                12.839935,
            longitude:
                77.677032,
        },

        drop: {
            address:
                "Kempegowda Airport",
            latitude:
                13.198635,
            longitude:
                77.706593,
        },
    },
];

export default function Sample() {
    const [pickupText, setPickupText] =
        useState("");

    const [dropText, setDropText] =
        useState("");

    const [pickupLocation, setPickupLocation] =
        useState<LocationType | null>(
            null
        );

    const [dropLocation, setDropLocation] =
        useState<LocationType | null>(
            null
        );

    const [showPickupModal, setShowPickupModal] =
        useState(false);

    const [showRideModal, setShowRideModal] =
        useState(false);

    const [fares, setFares] =
        useState<FareItem[]>([]);

    const [selectedFare, setSelectedFare] =
        useState<FareItem | null>(
            null
        );

    const [distance, setDistance] =
        useState(0);

    const [duration, setDuration] =
        useState(0);

    const handlePickupSelect = (
        location: LocationType
    ) => {
        setPickupLocation(location);

        setPickupText(
            location.address
        );
    };

    const handleDropSelect = (
        location: LocationType
    ) => {
        setDropLocation(location);

        setDropText(
            location.address
        );

        if (pickupLocation) {
            setShowPickupModal(
                true
            );
        }
    };

    const handleRecentRouteSelect = (
        route: SavedRoute
    ) => {
        setPickupLocation(
            route.pickup
        );

        setDropLocation(
            route.drop
        );

        setPickupText(
            route.pickup.address
        );

        setDropText(
            route.drop.address
        );

        setShowPickupModal(
            true
        );
    };

    const handlePickupConfirmed = (
        updatedLocation:
            LocationType
    ) => {
        setPickupLocation(
            updatedLocation
        );

        setPickupText(
            updatedLocation.address
        );

        setShowPickupModal(
            false
        );

        setShowRideModal(
            true
        );
    };

    const handleBookRide =
        () => {
            if (
                !selectedFare
            ) {
                Alert.alert(
                    "Select Vehicle",
                    "Please select a ride."
                );

                return;
            }

            Alert.alert(
                "Ride Confirmeds",
                `Booking ${selectedFare.vehicleType}
                
Fare: ₹${selectedFare.totalFare}`
            );
        };

    return (
        <>
            <SafeAreaView
                style={
                    styles.container
                }
            >
                {/* Header */}

                <View
                    style={
                        styles.pageHeader
                    }
                >
                    <TouchableOpacity
                        onPress={() =>
                            router.back()
                        }
                        style={
                            styles.pageBackButton
                        }
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#111827"
                        />
                    </TouchableOpacity>

                    <Text
                        style={
                            styles.title
                        }
                    >
                        Choose Location
                    </Text>
                </View>

                {/* Pickup */}

                <View
                    style={
                        styles.pickupContainer
                    }
                >
                    <LocationInput
                        placeholder="Enter pickup location"
                        value={
                            pickupText
                        }
                        onChangeText={
                            setPickupText
                        }
                        onSelect={
                            handlePickupSelect
                        }
                    />
                </View>

                <View
                    style={
                        styles.spacing
                    }
                />

                {/* Drop */}

                <View
                    style={
                        styles.dropContainer
                    }
                >
                    <LocationInput
                        placeholder="Where would you like to go?"
                        value={
                            dropText
                        }
                        onChangeText={
                            setDropText
                        }
                        onSelect={
                            handleDropSelect
                        }
                    />
                </View>

                {/* Recent Trips */}

                <RecentLocations
                    routes={
                        recentRoutes
                    }
                    onSelectRoute={
                        handleRecentRouteSelect
                    }
                />
            </SafeAreaView>

            {/* Pickup Confirmation */}

            <ConfirmPickupLocationModal
                visible={
                    showPickupModal
                }
                location={
                    pickupLocation
                }
                onClose={() =>
                    setShowPickupModal(
                        false
                    )
                }
                onConfirm={
                    handlePickupConfirmed
                }
            />

            {/* Ride Selection */}

            <Modal
                visible={
                    showRideModal
                }
                animationType="slide"
                presentationStyle="fullScreen"
            >
                <SafeAreaView
                    style={{
                        flex: 1,
                        backgroundColor:
                            "#FFF",
                    }}
                >
                    {/* Header */}

                    <View
                        style={
                            styles.rideHeader
                        }
                    >
                        <TouchableOpacity
                            onPress={() =>
                                setShowRideModal(
                                    false
                                )
                            }
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="#111827"
                            />
                        </TouchableOpacity>

                        <Text
                            style={
                                styles.rideTitle
                            }
                        >
                            Choose Ride
                        </Text>

                        <View
                            style={{
                                width: 24,
                            }}
                        />
                    </View>

                    {/* Route Map */}

                    {pickupLocation &&
                        dropLocation && (
                            <View
                                style={
                                    styles.mapContainer
                                }
                            >
                                <RouteMap
                                    pickupLocation={
                                        pickupLocation
                                    }
                                    dropLocation={
                                        dropLocation
                                    }
                                    onRouteReady={(
                                        routeDistance,
                                        routeDuration,
                                        fareData
                                    ) => {
                                        setDistance(
                                            routeDistance
                                        );

                                        setDuration(
                                            routeDuration
                                        );

                                        setFares(
                                            fareData
                                        );
                                    }}
                                />
                            </View>
                        )}


                    {/* Fare List */}

                    <View
                        style={{
                            flex: 1,
                            padding: 16,
                        }}
                    >
                        <FareList
                            fares={
                                fares
                            }
                            selectedVehicle={
                                selectedFare?.vehicleType
                            }
                            onSelectFare={
                                setSelectedFare
                            }
                            onConfirmRide={() =>
                                handleBookRide()
                            }
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            padding:
                theme.SPACING.xl,
            backgroundColor:
                theme.COLORS
                    .white,
        },

        pageHeader: {
            flexDirection:
                "row",
            alignItems:
                "center",
            marginBottom: 20,
        },

        pageBackButton: {
            marginRight: 12,
        },

        title: {
            fontSize:
                theme
                    .FONT_SIZES
                    .xl,
            fontWeight: "700",
            color:
                theme.COLORS
                    .text,
        },

        pickupContainer: {
            zIndex: 2000,
        },

        dropContainer: {
            zIndex: 1000,
        },

        spacing: {
            height:
                theme.SPACING
                    .md,
        },

        rideHeader: {
            height: 60,
            flexDirection:
                "row",
            alignItems:
                "center",
            justifyContent:
                "space-between",
            paddingHorizontal: 16,
            borderBottomWidth: 1,
            borderBottomColor:
                "#E5E7EB",
        },

        rideTitle: {
            fontSize: 18,
            fontWeight:
                "700",
        },

        mapContainer: {
            height: "40%",
        },

        tripSummary: {
            flexDirection:
                "row",
            justifyContent:
                "space-between",
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor:
                "#E5E7EB",
        },

        summaryText: {
            fontSize: 15,
            fontWeight:
                "600",
            color: "#111827",
        },
    });