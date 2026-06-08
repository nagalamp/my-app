// app/components/RouteMap.tsx

import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    StyleSheet,
    View,
    Text,
} from "react-native";

import MapView, {
    Marker,
    PROVIDER_GOOGLE,
} from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";

import axiosInstance from "../../api/axios";

import { showError } from "../../utils/toast";

import {
    LocationType,
} from "./LocationInput";

const GOOGLE_API_KEY =
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "";

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
        distance: number,
        duration: number,
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

    const [routeInfo, setRouteInfo] =
        useState({
            distance: 0,
            duration: 0,
        });

    const pickup = {
        latitude:
            pickupLocation.latitude,
        longitude:
            pickupLocation.longitude,
    };

    const drop = {
        latitude:
            dropLocation.latitude,
        longitude:
            dropLocation.longitude,
    };

    useEffect(() => {
        if (
            mapRef.current
        ) {
            mapRef.current.fitToCoordinates(
                [pickup, drop],
                {
                    edgePadding: {
                        top: 60,
                        right: 60,
                        bottom: 180,
                        left: 60,
                    },
                    animated: true,
                }
            );
        }
    }, [
        pickupLocation,
        dropLocation,
    ]);

    const fetchFareEstimate =
        async (
            distance: number,
            duration: number
        ) => {
            try {
                const payload = {
                    pickup: {
                        address:
                            pickupLocation.address,
                        latitude:
                            pickupLocation.latitude,
                        longitude:
                            pickupLocation.longitude,
                    },

                    drop: {
                        address:
                            dropLocation.address,
                        latitude:
                            dropLocation.latitude,
                        longitude:
                            dropLocation.longitude,
                    },

                    distance,
                    duration,
                };

                const response =
                    await axiosInstance.post(
                        "/fare/estimate",
                        payload
                    );

                if (
                    response.data
                        ?.success
                ) {
                    const fares: FareItem[] =
                        response.data
                            ?.fares || [];

                    onRouteReady?.(
                        distance,
                        duration,
                        fares
                    );
                } else {
                    onRouteReady?.(
                        distance,
                        duration,
                        []
                    );
                }
            } catch (
            error: any
            ) {
                console.log(
                    "Fare Estimate Error:",
                    error?.response
                        ?.data || error
                );

                showError(
                    error?.response
                        ?.data
                        ?.message ||
                    "Unable to fetch fare estimate"
                );

                onRouteReady?.(
                    distance,
                    duration,
                    []
                );
            }
        };

    return (
        <View
            style={
                styles.container
            }
        >
            <MapView
                ref={mapRef}
                provider={
                    PROVIDER_GOOGLE
                }
                style={styles.map}
                initialRegion={{
                    latitude:
                        pickup.latitude,
                    longitude:
                        pickup.longitude,
                    latitudeDelta:
                        0.05,
                    longitudeDelta:
                        0.05,
                }}
            >
                <Marker
                    coordinate={
                        pickup
                    }
                    title="Pickup"
                    description={
                        pickupLocation.address
                    }
                    pinColor="#22C55E"
                />

                <Marker
                    coordinate={
                        drop
                    }
                    title="Drop"
                    description={
                        dropLocation.address
                    }
                    pinColor="#EF4444"
                />

                <MapViewDirections
                    origin={
                        pickup
                    }
                    destination={
                        drop
                    }
                    apikey={
                        GOOGLE_API_KEY
                    }
                    strokeWidth={5}
                    strokeColor="#2563EB"
                    optimizeWaypoints
                    onReady={async (
                        result
                    ) => {
                        setRouteInfo(
                            {
                                distance:
                                    result.distance,

                                duration:
                                    result.duration,
                            }
                        );

                        mapRef.current?.fitToCoordinates(
                            result.coordinates,
                            {
                                edgePadding:
                                {
                                    top: 60,
                                    right: 60,
                                    bottom: 180,
                                    left: 60,
                                },
                                animated: true,
                            }
                        );

                        await fetchFareEstimate(
                            result.distance,
                            result.duration
                        );
                    }}
                    onError={(
                        errorMessage
                    ) => {
                        console.log(
                            "Directions Error:",
                            errorMessage
                        );

                        showError(
                            "Unable to load route"
                        );
                    }}
                />
            </MapView>

            {routeInfo.distance >
                0 && (
                    <View
                        style={
                            styles.statsContainer
                        }
                    >
                        {/* Trip Details Card */}
                        <View
                            style={
                                styles.summaryCard
                            }
                        >
                            <Text
                                style={
                                    styles.cardTitle
                                }
                            >
                                Trip Details
                            </Text>

                            <Text
                                style={
                                    styles.cardValue
                                }
                            >
                                📍{" "}
                                {routeInfo.distance.toFixed(
                                    1
                                )}{" "}
                                km
                            </Text>

                            <Text
                                style={
                                    styles.cardValue
                                }
                            >
                                ⏱{" "}
                                {Math.round(
                                    routeInfo.duration
                                )}{" "}
                                min
                            </Text>
                        </View>

                        {/* Route Card */}
                        <View
                            style={
                                styles.routeCard
                            }
                        >
                            <Text
                                style={
                                    styles.cardTitle
                                }
                            >
                                Route
                            </Text>

                            <Text
                                style={
                                    styles.locationText
                                }
                                numberOfLines={
                                    1
                                }
                            >
                                🟢{" "}
                                {
                                    pickupLocation.address
                                }
                            </Text>

                            <Text
                                style={
                                    styles.locationText
                                }
                                numberOfLines={
                                    1
                                }
                            >
                                🔴{" "}
                                {
                                    dropLocation.address
                                }
                            </Text>
                        </View>
                    </View>
                )}
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

        statsContainer:
        {
            position:
                "absolute",

            bottom: 20,

            left: 15,

            right: 15,

            flexDirection:
                "row",

            zIndex:
                1000,
        },

        summaryCard: {
            width: 120,

            backgroundColor:
                "#FFFFFF",

            borderRadius:
                12,

            padding: 10,

            marginRight: 8,

            shadowColor:
                "#000",

            shadowOffset:
            {
                width: 0,
                height: 2,
            },

            shadowOpacity:
                0.12,

            shadowRadius:
                3,

            elevation: 4,
        },

        routeCard: {
            flex: 1,

            backgroundColor:
                "#FFFFFF",

            borderRadius:
                12,

            padding: 10,

            shadowColor:
                "#000",

            shadowOffset:
            {
                width: 0,
                height: 2,
            },

            shadowOpacity:
                0.12,

            shadowRadius:
                3,

            elevation: 4,
        },

        cardTitle: {
            fontSize: 11,

            fontWeight:
                "700",

            color:
                "#111827",

            marginBottom: 6,
        },

        cardValue: {
            fontSize: 13,

            fontWeight:
                "600",

            color:
                "#374151",

            marginBottom: 3,
        },

        locationText: {
            fontSize: 12,

            color:
                "#374151",

            marginBottom: 4,
        },
    });