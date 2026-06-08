// app/components/ConfirmPickupLocationModal.tsx

import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import MapView, {
    Region,
} from "react-native-maps";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    LocationType,
} from "./LocationInput";

import { theme } from "../../theme";

type Props = {
    visible: boolean;

    location: LocationType | null;

    onClose: () => void;

    onConfirm: (
        location: LocationType
    ) => void;
};

export default function ConfirmPickupLocationModal({
    visible,
    location,
    onClose,
    onConfirm,
}: Props) {
    const mapRef =
        useRef<MapView>(null);

    const [region, setRegion] =
        useState<Region>({
            latitude:
                12.9716,
            longitude:
                77.5946,
            latitudeDelta:
                0.005,
            longitudeDelta:
                0.005,
        });

    useEffect(() => {
        if (
            location &&
            visible
        ) {
            const newRegion = {
                latitude:
                    location.latitude,

                longitude:
                    location.longitude,

                latitudeDelta:
                    0.005,

                longitudeDelta:
                    0.005,
            };

            setRegion(
                newRegion
            );

            setTimeout(() => {
                mapRef.current?.animateToRegion(
                    newRegion,
                    500
                );
            }, 300);
        }
    }, [
        location,
        visible,
    ]);

    if (!location) {
        return null;
    }

    const handleConfirm =
        () => {
            onConfirm({
                ...location,

                latitude:
                    region.latitude,

                longitude:
                    region.longitude,
            });
        };

    return (
        <Modal
            visible={
                visible
            }
            animationType="slide"
            presentationStyle="fullScreen"
            onRequestClose={
                onClose
            }
        >
            <SafeAreaView
                style={
                    styles.container
                }
            >
                {/* Header */}

                <View
                    style={
                        styles.header
                    }
                >
                    <TouchableOpacity
                        style={
                            styles.backButton
                        }
                        onPress={
                            onClose
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
                        Confirm Pickup
                    </Text>

                    <View
                        style={{
                            width: 40,
                        }}
                    />
                </View>

                {/* Map */}

                <View
                    style={
                        styles.mapContainer
                    }
                >
                    <MapView
                        ref={mapRef}
                        style={
                            styles.map
                        }
                        region={
                            region
                        }
                        onRegionChangeComplete={(
                            updatedRegion
                        ) =>
                            setRegion(
                                updatedRegion
                            )
                        }
                        showsUserLocation
                        showsMyLocationButton
                        showsCompass
                        loadingEnabled
                    />

                    {/* Center Pin */}

                    <View
                        pointerEvents="none"
                        style={
                            styles.pinContainer
                        }
                    >
                        <Ionicons
                            name="location"
                            size={60}
                            color="#EF4444"
                        />
                    </View>
                </View>

                {/* Bottom Card */}

                <View
                    style={
                        styles.bottomSheet
                    }
                >
                    <Text
                        style={
                            styles.heading
                        }
                    >
                        Confirm Pickup Location
                    </Text>

                    <Text
                        style={
                            styles.description
                        }
                    >
                        Move the map to
                        adjust the exact
                        pickup point.
                    </Text>

                    <View
                        style={
                            styles.locationCard
                        }
                    >
                        <View
                            style={
                                styles.locationIcon
                            }
                        >
                            <Ionicons
                                name="navigate"
                                size={20}
                                color="#FFFFFF"
                            />
                        </View>

                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <Text
                                style={
                                    styles.locationLabel
                                }
                            >
                                Pickup
                                Address
                            </Text>

                            <Text
                                style={
                                    styles.locationText
                                }
                                numberOfLines={
                                    2
                                }
                            >
                                {
                                    location.address
                                }
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={
                            styles.confirmButton
                        }
                        onPress={
                            handleConfirm
                        }
                    >
                        <Text
                            style={
                                styles.confirmButtonText
                            }
                        >
                            Confirm Pickup
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                "#FFFFFF",
        },

        header: {
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

            backgroundColor:
                "#FFFFFF",
        },

        backButton: {
            width: 40,

            height: 40,

            justifyContent:
                "center",

            alignItems:
                "center",
        },

        title: {
            fontSize: 18,

            fontWeight:
                "700",

            color: "#111827",
        },

        mapContainer: {
            flex: 1,
        },

        map: {
            flex: 1,
        },

        pinContainer: {
            position:
                "absolute",

            top: "50%",

            left: "50%",

            marginLeft:
                -30,

            marginTop:
                -60,
        },

        bottomSheet: {
            padding: 20,

            backgroundColor:
                "#FFFFFF",

            borderTopWidth: 1,

            borderTopColor:
                "#E5E7EB",
        },

        heading: {
            fontSize: 18,

            fontWeight:
                "700",

            color: "#111827",

            marginBottom: 6,
        },

        description: {
            fontSize: 14,

            color: "#64748B",

            marginBottom: 16,
        },

        locationCard: {
            flexDirection:
                "row",

            alignItems:
                "center",

            backgroundColor:
                "#F8FAFC",

            borderRadius: 14,

            padding: 14,

            marginBottom: 16,
        },

        locationIcon: {
            width: 40,

            height: 40,

            borderRadius: 20,

            justifyContent:
                "center",

            alignItems:
                "center",

            backgroundColor:
                theme.COLORS
                    .primary,

            marginRight: 12,
        },

        locationLabel: {
            fontSize: 12,

            fontWeight:
                "600",

            color: "#64748B",

            marginBottom: 4,
        },

        locationText: {
            fontSize: 14,

            color: "#111827",
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
        },

        confirmButtonText: {
            color: "#FFFFFF",

            fontSize: 16,

            fontWeight:
                "700",
        },
    });