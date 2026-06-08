import React from "react";

import {
    View,
    StyleSheet,
    ScrollView,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    router,
    useLocalSearchParams,
} from "expo-router";

import { theme } from "../theme";

import BookingHeader from "./components/confirm-booking/BookingHeader";
import OtpCard from "./components/confirm-booking/OtpCard";
import HomeButton from "./components/confirm-booking/HomeButton";
import DriverAssignedCard from "./components/confirm-booking/DriverAssignedCard";
import TripRouteCard from "./components/confirm-booking/TripRouteCard";

export default function ConfirmBooking() {
    const params =
        useLocalSearchParams();

    return (
        <SafeAreaView
            style={styles.container}
            edges={[
                "top",
                "left",
                "right",
                "bottom",
            ]}
        >
            <ScrollView
                contentContainerStyle={
                    styles.content
                }
                showsVerticalScrollIndicator={
                    false
                }
            >
                <BookingHeader
                    bookingNumber={String(
                        params.bookingNumber ||
                        "-"
                    )}
                />

                <TripRouteCard
                    pickup={String(
                        params.pickup ||
                        "Kengeri, Bengaluru"
                    )}
                    drop={String(
                        params.drop ||
                        "Electronic City, Bengaluru"
                    )}
                />

                <OtpCard
                    otp={String(
                        params.bookingOtp ||
                        "----"
                    )}
                />

                <DriverAssignedCard
                    driverName={String(
                        params.driverName ||
                        "Ramesh Kumar"
                    )}
                    driverPhone={String(
                        params.driverPhone ||
                        "9876543210"
                    )}
                    driverRating={String(
                        params.driverRating ||
                        "4.9"
                    )}
                    vehicleName={String(
                        params.vehicleName ||
                        "Swift Dzire"
                    )}
                    vehicleNumber={String(
                        params.vehicleNumber ||
                        "KA01AB1234"
                    )}
                    eta={String(
                        params.eta ||
                        "3 mins away"
                    )}
                    driverImage={String(
                        params.driverImage ||
                        ""
                    )}
                />

                <View
                    style={
                        styles.footer
                    }
                >
                    <HomeButton
                        onPress={() =>
                            router.replace(
                                "/"
                            )
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles =
    StyleSheet.create({
        container: {
            flex: 1,

            backgroundColor:
                theme.COLORS
                    .background,
        },

        content: {
            paddingHorizontal:
                theme.SPACING.md,

            paddingTop:
                theme.SPACING.sm,

            paddingBottom:
                theme.SPACING.xl,

            gap:
                theme.SPACING.sm,
        },

        footer: {
            marginTop:
                theme.SPACING.md,
        },
    });