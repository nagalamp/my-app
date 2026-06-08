// app/components/RouteMap.tsx

import React, {
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    StyleSheet,
} from "react-native";

import MapView, {
    Marker,
} from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";

import {
    LocationType,
} from "./LocationInput";

import { theme } from "../../theme";

export type FareItem = {
    vehicleType: string;
    baseFare: number;
    distanceFare: number;
    timeFare: number;
    totalFare: number;
};

type Props = {
    pickupLocation: LocationType;
    dropLocation: LocationType;

    onRouteReady?: (
        distanceKm: number,
        durationMinutes: number,
        fares: FareItem[]
    ) => void;
};

export default function RouteMap({
    pickupLocation,
    dropLocation,
    onRouteReady,
}: Props) {
    const mapRef =
        useRef<MapView>(null);

    const [distance, setDistance] =
        useState(0);

    const [duration, setDuration] =
        useState(0);

    const calculateFares = (
        distanceKm: number,
        durationMinutes: number
    ): FareItem[] => {
        const vehicles = [
            {
                vehicleType:
                    "bike",
                baseFare: 30,
                perKmRate: 8,
                perMinuteRate:
                    0.5,
            },

            {
                vehicleType:
                    "auto",
                baseFare: 50,
                perKmRate: 12,
                perMinuteRate:
                    1,
            },

            {
                vehicleType:
                    "car",
                baseFare: 80,
                perKmRate: 16,
                perMinuteRate:
                    1.5,
            },

            {
                vehicleType:
                    "truck",
                baseFare: 150,
                perKmRate: 25,
                perMinuteRate:
                    2,
            },
        ];

        return vehicles.map(
            (
                vehicle
            ) => {
                const distanceFare =
                    Math.round(
                        distanceKm *
                        vehicle.perKmRate
                    );

                const timeFare =
                    Math.round(
                        durationMinutes *
                        vehicle.perMinuteRate
                    );

                return {
                    vehicleType:
                        vehicle.vehicleType,

                    baseFare:
                        vehicle.baseFare,

                    distanceFare,

                    timeFare,

                    totalFare:
                        vehicle.baseFare +
                        distanceFare +
                        timeFare,
                };
            }
        );
    };

    return (
        <View
            style={
                styles.container
            }
        >
            <MapView
                ref={mapRef}
                style={
                    styles.map
                }
                showsUserLocation
                showsMyLocationButton
                loadingEnabled
                region={{
                    latitude:
                        pickupLocation.latitude,
                    longitude:
                        pickupLocation.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* Pickup Marker */}

                <Marker
                    coordinate={{
                        latitude:
                            pickupLocation.latitude,
                        longitude:
                            pickupLocation.longitude,
                    }}
                    title="Pickup"
                    description={
                        pickupLocation.address
                    }
                    pinColor="green"
                />

                {/* Drop Marker */}

                <Marker
                    coordinate={{
                        latitude:
                            dropLocation.latitude,
                        longitude:
                            dropLocation.longitude,
                    }}
                    title="Drop"
                    description={
                        dropLocation.address
                    }
                    pinColor="red"
                />

                {/* Actual Route */}

                <MapViewDirections
                    key={`${pickupLocation.latitude}-${pickupLocation.longitude}-${dropLocation.latitude}-${dropLocation.longitude}`}
                    origin={{
                        latitude:
                            pickupLocation.latitude,
                        longitude:
                            pickupLocation.longitude,
                    }}
                    destination={{
                        latitude:
                            dropLocation.latitude,
                        longitude:
                            dropLocation.longitude,
                    }}
                    apikey={
                        process.env
                            .EXPO_PUBLIC_GOOGLE_MAPS_API_KEY!
                    }
                    strokeWidth={
                        5
                    }
                    strokeColor="#2563EB"
                    optimizeWaypoints
                    resetOnChange={false}
                    mode="DRIVING"
                    onReady={(
                        result
                    ) => {
                        const routeDistance =
                            Number(
                                result.distance.toFixed(
                                    2
                                )
                            );

                        const routeDuration =
                            Math.round(
                                result.duration
                            );

                        setDistance(
                            routeDistance
                        );

                        setDuration(
                            routeDuration
                        );

                        const fares =
                            calculateFares(
                                routeDistance,
                                routeDuration
                            );

                        onRouteReady?.(
                            routeDistance,
                            routeDuration,
                            fares
                        );

                        mapRef.current?.fitToCoordinates(
                            result.coordinates,
                            {
                                edgePadding:
                                {
                                    top: 120,
                                    right: 60,
                                    bottom: 220,
                                    left: 60,
                                },
                                animated:
                                    true,
                            }
                        );
                    }}
                    onError={(
                        error
                    ) => {
                        console.log(
                            "Directions Error:",
                            error
                        );
                    }}
                />
            </MapView>

            <View style={styles.routeInfoContainer}>
                <View style={styles.routeRow}>
                    <View style={styles.pickupDot} />
                    <Text
                        numberOfLines={1}
                        style={styles.addressText}
                    >
                        {pickupLocation.address}
                    </Text>
                </View>

                <View style={styles.routeLine} />

                <View style={styles.routeRow}>
                    <View style={styles.dropDot} />

                    <Text
                        numberOfLines={1}
                        style={styles.addressText}
                    >
                        {dropLocation.address}
                    </Text>
                </View>

                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>
                        📏 {distance} km
                    </Text>

                    <Text style={styles.statsText}>
                        ⏱ {duration} min
                    </Text>
                </View>
            </View>

        </View>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
        },

        map: {
            flex: 1,
        },

        summaryContainer: {
            position:
                "absolute",

            top: 20,

            left: 16,

            right: 16,

            flexDirection:
                "row",

            justifyContent:
                "space-between",
        },

        summaryCard: {
            backgroundColor:
                "#FFFFFF",

            paddingHorizontal: 18,

            paddingVertical: 12,

            borderRadius: 14,

            shadowColor:
                "#000",

            shadowOffset: {
                width: 0,
                height: 2,
            },

            shadowOpacity:
                0.08,

            shadowRadius: 4,

            elevation: 4,
        },

        label: {
            fontSize: 12,
            color: "#64748B",
        },

        value: {
            fontSize: 16,
            fontWeight:
                "700",
            color:
                theme.COLORS
                    .text,
            marginTop: 2,
        },
        routeInfoContainer: {
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 12,
            backgroundColor: "#FFD700",
            borderRadius: 16,
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 5,
        },

        routeRow: {
            flexDirection: "row",
            alignItems: "center",
        },

        pickupDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#22C55E",
            marginRight: 12,
        },

        dropDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: "#EF4444",
            marginRight: 12,
        },

        routeLine: {
            width: 2,
            height: 4,
            backgroundColor: "#D1D5DB",
            marginLeft: 4,
            marginVertical: 6,
        },

        addressText: {
            flex: 1,
            fontSize: 13,
            color: "#111827",
            fontWeight: "500",
        },

        statsContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 0,
            paddingTop: 6,
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
        },

        statsText: {
            fontSize: 15,
            fontWeight: "800",
            color: "#111827",
        }
    });