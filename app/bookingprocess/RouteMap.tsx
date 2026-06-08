// app/components/RouteMap.tsx

import React, {
    useRef,
    useState,
} from "react";

import {
    View,
    StyleSheet,
    Text,
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

    const generateFares = (
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
                initialRegion={{
                    latitude:
                        pickupLocation.latitude,

                    longitude:
                        pickupLocation.longitude,

                    latitudeDelta:
                        0.05,

                    longitudeDelta:
                        0.05,
                }}
            >
                {/* Pickup */}

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

                {/* Destination */}

                <Marker
                    coordinate={{
                        latitude:
                            dropLocation.latitude,

                        longitude:
                            dropLocation.longitude,
                    }}
                    title="Destination"
                    description={
                        dropLocation.address
                    }
                    pinColor="red"
                />

                {/* Actual Road Route */}

                <MapViewDirections
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
                            generateFares(
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
                                    top: 100,
                                    right: 60,
                                    bottom: 100,
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

            {/* Distance & Duration */}

            <View
                style={
                    styles.summaryContainer
                }
            >
                <View
                    style={
                        styles.summaryCard
                    }
                >
                    <Text
                        style={
                            styles.label
                        }
                    >
                        Distance
                    </Text>

                    <Text
                        style={
                            styles.value
                        }
                    >
                        {distance} km
                    </Text>
                </View>

                <View
                    style={
                        styles.summaryCard
                    }
                >
                    <Text
                        style={
                            styles.label
                        }
                    >
                        Duration
                    </Text>

                    <Text
                        style={
                            styles.value
                        }
                    >
                        {duration} min
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

            top: 16,

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

            paddingHorizontal: 16,

            paddingVertical: 10,

            borderRadius: 12,

            shadowColor:
                "#000",

            shadowOffset: {
                width: 0,
                height: 2,
            },

            shadowOpacity:
                0.1,

            shadowRadius: 4,

            elevation: 3,
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
        },
    });