// app/components/Sample.tsx

import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { router } from "expo-router";

import LocationInput, {
    LocationType,
} from "./LocationInput";

import RouteMap, {
    FareItem,
} from "./RouteMap";

import FareList from "./FareList";

import { theme } from "../../theme";



export default function Sample() {

    const [showBookingModal, setShowBookingModal] =
        useState(false);

    const [showConfirmModal, setShowConfirmModal] =
        useState(false);

    const [bookingFare, setBookingFare] =
        useState<FareItem | null>(null);


    const [pickupText, setPickupText] =
        useState("");

    const [dropText, setDropText] =
        useState("");

    const [pickupLocation, setPickupLocation] =
        useState<LocationType | null>(null);

    const [dropLocation, setDropLocation] =
        useState<LocationType | null>(null);

    const [showMap, setShowMap] =
        useState(false);

    const [fares, setFares] =
        useState<FareItem[]>([]);

    const [selectedFare, setSelectedFare] =
        useState<FareItem | null>(null);

    const handlePickupSelect = (
        location: LocationType
    ) => {
        setPickupLocation(location);
        setPickupText(location.address);

        if (dropLocation) {
            setShowMap(true);
        }
    };

    const handleDropSelect = (
        location: LocationType
    ) => {
        setDropLocation(location);
        setDropText(location.address);

        if (pickupLocation) {
            setShowMap(true);
        }
    };

    const handleBack = () => {
        if (showMap) {
            setShowMap(false);
            return;
        }

        router.back();
    };

    return (
        <>
            <SafeAreaView style={styles.container}>
                {/* Modal */}

                <Modal
                    visible={showConfirmModal}
                    animationType="slide"
                    presentationStyle="fullScreen"
                >
                    <SafeAreaView
                        style={{
                            flex: 1,
                            backgroundColor: "#FFF",
                        }}
                    >
                        {/* Header */}

                        <View
                            style={
                                styles.confirmHeader
                            }
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    setShowConfirmModal(
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
                                    styles.confirmTitle
                                }
                            >
                                Confirm Pickup
                            </Text>

                            <View
                                style={{
                                    width: 24,
                                }}
                            />
                        </View>

                        {/* Map */}

                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            {pickupLocation &&
                                dropLocation && (
                                    <RouteMap
                                        pickupLocation={
                                            pickupLocation
                                        }
                                        dropLocation={
                                            dropLocation
                                        }
                                    />
                                )}
                        </View>

                        {/* Bottom Sheet */}

                        <View
                            style={
                                styles.bookingCard
                            }
                        >
                            <Text
                                style={
                                    styles.bookingVehicle
                                }
                            >
                                {selectedFare?.vehicleType?.toUpperCase()}
                            </Text>

                            <Text
                                style={
                                    styles.bookingAddress
                                }
                            >
                                {
                                    pickupLocation?.address
                                }
                            </Text>

                            <Text
                                style={
                                    styles.bookingFare
                                }
                            >
                                ₹
                                {
                                    selectedFare?.totalFare
                                }
                            </Text>

                            <TouchableOpacity
                                style={
                                    styles.bookRideButton
                                }
                                onPress={() => {
                                    console.log(
                                        "BOOK RIDE"
                                    );

                                    setShowConfirmModal(
                                        false
                                    );
                                }}
                            >
                                <Text
                                    style={
                                        styles.bookRideButtonText
                                    }
                                >
                                    Confirm Pickup &
                                    Book Ride
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>

                <View style={styles.pageHeader}>
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

                    <Text style={styles.title}>
                        Choose Location
                    </Text>
                </View>

                <View
                    style={styles.pickupContainer}
                >
                    <LocationInput
                        placeholder="Enter pickup location"
                        value={pickupText}
                        onChangeText={
                            setPickupText
                        }
                        onSelect={
                            handlePickupSelect
                        }
                    />
                </View>

                <View style={styles.spacing} />

                <View
                    style={styles.dropContainer}
                >
                    <LocationInput
                        placeholder="Where would you like to go?"
                        value={dropText}
                        onChangeText={
                            setDropText
                        }
                        onSelect={
                            handleDropSelect
                        }
                    />
                </View>
            </SafeAreaView>

            <Modal
                visible={
                    showMap &&
                    !!pickupLocation &&
                    !!dropLocation
                }
                animationType="slide"
                presentationStyle="fullScreen"
                onRequestClose={
                    handleBack
                }
            >
                <SafeAreaView
                    style={
                        styles.modalContainer
                    }
                >
                    {/* Modal Header */}

                    <View style={styles.header}>
                        <TouchableOpacity
                            style={
                                styles.backButton
                            }
                            onPress={
                                handleBack
                            }
                        >
                            <Ionicons
                                name="arrow-back"
                                size={26}
                                color="#111827"
                            />
                        </TouchableOpacity>

                        <Text
                            style={
                                styles.headerTitle
                            }
                        >
                            Rides
                        </Text>

                        <View
                            style={{
                                width: 40,
                            }}
                        />
                    </View>

                    {pickupLocation &&
                        dropLocation && (
                            <>
                                <View
                                    style={
                                        styles.routeMapContainer
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
                                            console.log(
                                                "Distance:",
                                                routeDistance
                                            );

                                            console.log(
                                                "Duration:",
                                                routeDuration
                                            );

                                            console.log(
                                                "Fare Data:",
                                                fareData
                                            );

                                            setFares(
                                                fareData
                                            );
                                        }}
                                    />
                                </View>

                                <View
                                    style={
                                        styles.bottomContainer
                                    }
                                >
                                    <Text
                                        style={
                                            styles.sectionTitle
                                        }
                                    >
                                        Choose your Ride
                                    </Text>

                                    <View
                                        style={
                                            styles.fareContainer
                                        }
                                    >
                                        <FareList
                                            fares={fares}
                                            selectedVehicle={
                                                selectedFare?.vehicleType
                                            }
                                            onSelectFare={setSelectedFare}
                                            onConfirmRide={(fare) => {
                                                setSelectedFare(fare);
                                                setShowConfirmModal(true);
                                            }}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                </SafeAreaView>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.SPACING.xl,
        backgroundColor:
            theme.COLORS.white,
    },

    pageHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    pageBackButton: {
        marginRight: 12,
    },

    title: {
        fontSize:
            theme.FONT_SIZES.xl,
        fontWeight: "600",
        color: theme.COLORS.text,
    },

    pickupContainer: {
        zIndex: 2000,
    },

    dropContainer: {
        zIndex: 1000,
    },

    spacing: {
        height: theme.SPACING.md,
    },

    modalContainer: {
        flex: 1,
        backgroundColor:
            theme.COLORS.white,
    },

    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:
            "space-between",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor:
            "#E5E7EB",
        backgroundColor: "#FFF",
    },

    backButton: {
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    headerTitle: {
        fontSize:
            theme.FONT_SIZES.lg,
        fontWeight: "700",
        color: theme.COLORS.text,
    },

    routeMapContainer: {
        height: "40%",
    },

    bottomContainer: {
        flex: 1,
        padding: theme.SPACING.md,
    },

    sectionTitle: {
        fontSize:
            theme.FONT_SIZES.lg,
        fontWeight: "700",
        color: theme.COLORS.text,
        marginBottom:
            theme.SPACING.md,
    },

    fareContainer: {
        flex: 1,
    },

    confirmHeader: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:
            "space-between",
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor:
            "#E5E7EB",
    },

    confirmTitle: {
        fontSize: 18,
        fontWeight: "700",
        color:
            theme.COLORS.text,
    },

    bookingCard: {
        padding: 20,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderTopWidth: 1,
        borderColor: "#E5E7EB",
    },

    bookingVehicle: {
        fontSize: 22,
        fontWeight: "700",
        color:
            theme.COLORS.text,
    },

    bookingAddress: {
        marginTop: 8,
        color: "#6B7280",
        fontSize: 14,
    },

    bookingFare: {
        marginTop: 12,
        fontSize: 28,
        fontWeight: "700",
        color:
            theme.COLORS.primary,
    },

    bookRideButton: {
        height: 56,
        marginTop: 20,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
            theme.COLORS.primary,
    },

    bookRideButtonText: {
        color:
            theme.COLORS.white,
        fontSize: 16,
        fontWeight: "700",
    },
});