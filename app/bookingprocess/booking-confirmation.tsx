// app/booking-confirmation.tsx

import React from "react";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    Ionicons,
    MaterialIcons,
} from "@expo/vector-icons";

import {
    useLocalSearchParams,
    router,
} from "expo-router";

import { theme } from "../../theme";

export default function BookingConfirmation() {
    const {
        pickup,
        drop,
        distance,
        duration,
        vehicleType,
        baseFare,
        distanceFare,
        timeFare,
        totalFare,
    } = useLocalSearchParams();

    const otp = "4728";

    const driver = {
        name: "Ramesh Kumar",
        rating: "4.8",
        mobile: "9876543210",
        vehicleNumber:
            "KA01AB1234",
        vehicleModel:
            "Swift Dzire",
        eta: "3 min",
    };

    return (
        <SafeAreaView
            style={
                styles.container
            }
        >
            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.content
                }
            >
                {/* Header */}

                <View
                    style={
                        styles.header
                    }
                >
                    <TouchableOpacity
                        onPress={() =>
                            router.back()
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
                            styles.headerTitle
                        }
                    >
                        Ride Confirmed
                    </Text>

                    <View
                        style={{
                            width: 24,
                        }}
                    />
                </View>

                {/* Success */}

                <View
                    style={
                        styles.successCard
                    }
                >
                    <Ionicons
                        name="checkmark-circle"
                        size={60}
                        color="#22C55E"
                    />

                    <Text
                        style={
                            styles.successTitle
                        }
                    >
                        Ride Booked
                    </Text>

                    <Text
                        style={
                            styles.successSubtitle
                        }
                    >
                        Driver assigned
                        successfully
                    </Text>
                </View>

                {/* OTP */}

                <View
                    style={
                        styles.card
                    }
                >
                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Ride OTP
                    </Text>

                    <Text
                        style={
                            styles.otp
                        }
                    >
                        {otp}
                    </Text>

                    <Text
                        style={
                            styles.helperText
                        }
                    >
                        Share this OTP
                        with the driver
                        before starting
                        the ride
                    </Text>
                </View>

                {/* Driver */}

                <View
                    style={
                        styles.card
                    }
                >
                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Driver Details
                    </Text>

                    <View
                        style={
                            styles.driverRow
                        }
                    >
                        <View
                            style={
                                styles.driverAvatar
                            }
                        >
                            <Ionicons
                                name="person"
                                size={28}
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
                                    styles.driverName
                                }
                            >
                                {
                                    driver.name
                                }
                            </Text>

                            <Text
                                style={
                                    styles.driverMeta
                                }
                            >
                                ⭐{" "}
                                {
                                    driver.rating
                                }
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={
                                styles.callButton
                            }
                        >
                            <Ionicons
                                name="call"
                                size={20}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={
                            styles.infoRow
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            Vehicle
                        </Text>

                        <Text
                            style={
                                styles.value
                            }
                        >
                            {
                                driver.vehicleModel
                            }
                        </Text>
                    </View>

                    <View
                        style={
                            styles.infoRow
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            Number
                        </Text>

                        <Text
                            style={
                                styles.value
                            }
                        >
                            {
                                driver.vehicleNumber
                            }
                        </Text>
                    </View>

                    <View
                        style={
                            styles.infoRow
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            ETA
                        </Text>

                        <Text
                            style={
                                styles.value
                            }
                        >
                            {
                                driver.eta
                            }
                        </Text>
                    </View>
                </View>

                {/* Trip */}

                <View
                    style={
                        styles.card
                    }
                >
                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Trip Details
                    </Text>

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
                            style={
                                styles.locationText
                            }
                        >
                            {pickup}
                        </Text>
                    </View>

                    <View
                        style={
                            styles.routeLine
                        }
                    />

                    <View
                        style={
                            styles.locationRow
                        }
                    >
                        <View
                            style={
                                styles.dropDot
                            }
                        />

                        <Text
                            style={
                                styles.locationText
                            }
                        >
                            {drop}
                        </Text>
                    </View>

                    <View
                        style={
                            styles.statsRow
                        }
                    >
                        <Text
                            style={
                                styles.statsText
                            }
                        >
                            📏 {distance} km
                        </Text>

                        <Text
                            style={
                                styles.statsText
                            }
                        >
                            ⏱ {duration} min
                        </Text>
                    </View>
                </View>

                {/* Fare */}

                <View
                    style={
                        styles.card
                    }
                >
                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Fare Details
                    </Text>

                    <View
                        style={
                            styles.infoRow
                        }
                    >
                        <Text>
                            Base Fare
                        </Text>

                        <Text>
                            ₹{baseFare}
                        </Text>
                    </View>

                    <View
                        style={
                            styles.infoRow
                        }
                    >
                        <Text>
                            Distance Fare
                        </Text>

                        <Text>
                            ₹
                            {
                                distanceFare
                            }
                        </Text>
                    </View>

                    <View
                        style={
                            styles.infoRow
                        }
                    >
                        <Text>
                            Time Fare
                        </Text>

                        <Text>
                            ₹{timeFare}
                        </Text>
                    </View>

                    <View
                        style={
                            styles.divider
                        }
                    />

                    <View
                        style={
                            styles.infoRow
                        }
                    >
                        <Text
                            style={
                                styles.totalLabel
                            }
                        >
                            Total Fare
                        </Text>

                        <Text
                            style={
                                styles.totalFare
                            }
                        >
                            ₹{totalFare}
                        </Text>
                    </View>
                </View>

                {/* Vehicle */}

                <View
                    style={
                        styles.card
                    }
                >
                    <Text
                        style={
                            styles.sectionTitle
                        }
                    >
                        Vehicle Type
                    </Text>

                    <Text
                        style={
                            styles.vehicleType
                        }
                    >
                        {vehicleType}
                    </Text>
                </View>

                {/* Actions */}

                <TouchableOpacity
                    style={
                        styles.primaryButton
                    }
                >
                    <Ionicons
                        name="call"
                        size={18}
                        color="#FFF"
                    />

                    <Text
                        style={
                            styles.primaryButtonText
                        }
                    >
                        Call Driver
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        styles.cancelButton
                    }
                >
                    <MaterialIcons
                        name="cancel"
                        size={18}
                        color="#EF4444"
                    />

                    <Text
                        style={
                            styles.cancelButtonText
                        }
                    >
                        Cancel Ride
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:
                "#F8FAFC",
        },

        content: {
            padding: 16,
        },

        header: {
            flexDirection:
                "row",
            alignItems:
                "center",
            justifyContent:
                "space-between",
            marginBottom: 20,
        },

        headerTitle: {
            fontSize: 18,
            fontWeight: "700",
            color: "#111827",
        },

        successCard: {
            backgroundColor:
                "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            alignItems:
                "center",
            marginBottom: 12,
        },

        successTitle: {
            fontSize: 20,
            fontWeight: "700",
            marginTop: 10,
        },

        successSubtitle: {
            color: "#64748B",
            marginTop: 4,
        },

        card: {
            backgroundColor:
                "#FFFFFF",
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
        },

        sectionTitle: {
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 12,
            color: "#111827",
        },

        otp: {
            fontSize: 42,
            fontWeight: "900",
            textAlign: "center",
            color:
                theme.COLORS.primary,
        },

        helperText: {
            textAlign: "center",
            marginTop: 8,
            color: "#64748B",
        },

        driverRow: {
            flexDirection:
                "row",
            alignItems:
                "center",
            marginBottom: 12,
        },

        driverAvatar: {
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor:
                theme.COLORS.primary,
            justifyContent:
                "center",
            alignItems:
                "center",
            marginRight: 12,
        },

        driverName: {
            fontSize: 16,
            fontWeight: "700",
        },

        driverMeta: {
            color: "#64748B",
        },

        callButton: {
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor:
                "#22C55E",
            justifyContent:
                "center",
            alignItems:
                "center",
        },

        infoRow: {
            flexDirection:
                "row",
            justifyContent:
                "space-between",
            marginBottom: 8,
        },

        label: {
            color: "#64748B",
        },

        value: {
            fontWeight: "600",
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
            marginRight: 10,
        },

        dropDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor:
                "#EF4444",
            marginRight: 10,
        },

        routeLine: {
            width: 2,
            height: 10,
            backgroundColor:
                "#D1D5DB",
            marginLeft: 4,
            marginVertical: 4,
        },

        locationText: {
            flex: 1,
            color: "#111827",
        },

        statsRow: {
            flexDirection:
                "row",
            justifyContent:
                "space-between",
            marginTop: 12,
        },

        statsText: {
            fontWeight: "700",
        },

        divider: {
            height: 1,
            backgroundColor:
                "#E5E7EB",
            marginVertical: 8,
        },

        totalLabel: {
            fontWeight: "700",
        },

        totalFare: {
            fontWeight: "900",
            fontSize: 18,
            color:
                theme.COLORS.primary,
        },

        vehicleType: {
            fontSize: 18,
            fontWeight: "700",
            textTransform:
                "capitalize",
        },

        primaryButton: {
            height: 52,
            borderRadius: 12,
            backgroundColor:
                "#22C55E",
            justifyContent:
                "center",
            alignItems:
                "center",
            flexDirection:
                "row",
            gap: 8,
            marginBottom: 10,
        },

        primaryButtonText: {
            color: "#FFF",
            fontWeight: "700",
        },

        cancelButton: {
            height: 52,
            borderRadius: 12,
            borderWidth: 1,
            borderColor:
                "#EF4444",
            justifyContent:
                "center",
            alignItems:
                "center",
            flexDirection:
                "row",
            gap: 8,
            marginBottom: 30,
        },

        cancelButtonText: {
            color: "#EF4444",
            fontWeight: "700",
        },
    });