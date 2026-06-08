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
            <View
                style={
                    styles.cardTop
                }
            >
                <View
                    style={
                        styles.iconContainer
                    }
                >
                    <Ionicons
                        name="time-outline"
                        size={18}
                        color={
                            theme.COLORS
                                .primary
                        }
                    />
                </View>

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

                    <Text
                        style={
                            styles.tripLabel
                        }
                    >
                        Recent Trip
                    </Text>
                </View>

                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={
                        theme.COLORS
                            .placeholder
                    }
                />
            </View>

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
                    color={
                        theme.COLORS
                            .subtitle
                    }
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
            marginTop:
                theme.SPACING.lg,
        },

        header: {
            flexDirection:
                "row",

            alignItems:
                "center",

            justifyContent:
                "space-between",

            marginBottom:
                theme.SPACING.sm,
        },

        heading: {
            fontSize:
                theme
                    .FONT_SIZES
                    .lg,

            fontWeight:
                "700",

            color:
                theme.COLORS
                    .text,
        },

        card: {
            backgroundColor:
                theme.COLORS
                    .card,

            borderRadius: 16,

            padding: 14,

            borderWidth: 1,

            borderColor:
                theme.COLORS
                    .border,

            marginBottom: 10,

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

        cardTop: {
            flexDirection:
                "row",

            alignItems:
                "center",

            marginBottom: 12,
        },

        iconContainer: {
            width: 40,

            height: 40,

            borderRadius: 20,

            justifyContent:
                "center",

            alignItems:
                "center",

            backgroundColor:
                theme.COLORS
                    .secondary,

            marginRight: 10,
        },

        content: {
            flex: 1,
        },

        routeTitle: {
            fontSize:
                theme
                    .FONT_SIZES
                    .md,

            fontWeight:
                "700",

            color:
                theme.COLORS
                    .text,
        },

        tripLabel: {
            fontSize:
                theme
                    .FONT_SIZES
                    .xs,

            color:
                theme.COLORS
                    .subtitle,

            marginTop: 2,
        },

        locationRow: {
            flexDirection:
                "row",

            alignItems:
                "center",
        },

        pickupDot: {
            width: 8,

            height: 8,

            borderRadius: 4,

            backgroundColor:
                "#22C55E",
        },

        connectorContainer: {
            paddingLeft: 3,

            marginVertical: 4,
        },

        connector: {
            width: 1,

            height: 14,

            backgroundColor:
                "#D1D5DB",
        },

        address: {
            flex: 1,

            marginLeft: 8,

            fontSize:
                theme
                    .FONT_SIZES
                    .sm,

            color:
                theme.COLORS
                    .subtitle,
        },
    });