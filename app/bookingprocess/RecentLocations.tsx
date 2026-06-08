// app/components/RecentLocations.tsx

import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

import {
    LocationType,
} from "./LocationInput";

import { theme } from "../../theme";

export type SavedRoute = {
    id: string;

    title: string;

    pickup: LocationType;

    drop: LocationType;
};

type Props = {
    routes: SavedRoute[];

    onSelectRoute: (
        route: SavedRoute
    ) => void;
};

export default function RecentLocations({
    routes,
    onSelectRoute,
}: Props) {
    if (
        !routes ||
        routes.length === 0
    ) {
        return null;
    }

    const renderItem = ({
        item,
    }: {
        item: SavedRoute;
    }) => (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.card}
            onPress={() =>
                onSelectRoute(item)
            }
        >
            {/* Left Icon */}

            <View
                style={
                    styles.iconContainer
                }
            >
                <Ionicons
                    name="time-outline"
                    size={24}
                    color={
                        theme.COLORS
                            .primary
                    }
                />
            </View>

            {/* Route Details */}

            <View
                style={
                    styles.content
                }
            >
                <Text
                    style={
                        styles.routeTitle
                    }
                    numberOfLines={1}
                >
                    {item.title}
                </Text>

                {/* Pickup */}

                <View
                    style={
                        styles.locationRow
                    }
                >
                    <View
                        style={
                            styles.pickupDot
                        }
                    />

                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={
                            styles.address
                        }
                    >
                        {
                            item.pickup
                                .address
                        }
                    </Text>
                </View>

                {/* Connector */}

                <View
                    style={
                        styles.connectorContainer
                    }
                >
                    <View
                        style={
                            styles.connector
                        }
                    />
                </View>

                {/* Drop */}

                <View
                    style={
                        styles.locationRow
                    }
                >
                    <Ionicons
                        name="location"
                        size={12}
                        color="#EF4444"
                    />

                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={
                            styles.address
                        }
                    >
                        {
                            item.drop
                                .address
                        }
                    </Text>
                </View>
            </View>

            {/* Arrow */}

            <Ionicons
                name="chevron-forward"
                size={20}
                color="#94A3B8"
            />
        </TouchableOpacity>
    );

    return (
        <View
            style={
                styles.container
            }
        >
            <View
                style={
                    styles.header
                }
            >
                <Text
                    style={
                        styles.heading
                    }
                >
                    Recent Trips
                </Text>

                <Ionicons
                    name="time-outline"
                    size={18}
                    color="#64748B"
                />
            </View>

            <FlatList
                data={routes}
                keyExtractor={(
                    item
                ) => item.id}
                renderItem={
                    renderItem
                }
                scrollEnabled={
                    false
                }
                showsVerticalScrollIndicator={
                    false
                }
            />
        </View>
    );
}

const styles =
    StyleSheet.create({
        container: {
            marginTop: 24,
        },

        header: {
            flexDirection:
                "row",

            alignItems:
                "center",

            justifyContent:
                "space-between",

            marginBottom: 12,
        },

        heading: {
            fontSize: 18,

            fontWeight:
                "700",

            color:
                theme.COLORS
                    .text,
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

        iconContainer: {
            width: 52,

            height: 52,

            borderRadius: 26,

            justifyContent:
                "center",

            alignItems:
                "center",

            backgroundColor:
                "#FFF7ED",

            marginRight: 14,
        },

        content: {
            flex: 1,

            marginRight: 10,
        },

        routeTitle: {
            fontSize: 15,

            fontWeight:
                "700",

            color:
                "#111827",

            marginBottom: 10,
        },

        locationRow: {
            flexDirection:
                "row",

            alignItems:
                "center",
        },

        pickupDot: {
            width: 10,

            height: 10,

            borderRadius: 5,

            backgroundColor:
                "#22C55E",
        },

        connectorContainer: {
            paddingLeft: 4,

            marginVertical: 4,
        },

        connector: {
            width: 1,

            height: 16,

            backgroundColor:
                "#D1D5DB",
        },

        address: {
            flex: 1,

            marginLeft: 10,

            fontSize: 13,

            color: "#64748B",
        },
    });