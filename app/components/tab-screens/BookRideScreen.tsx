import React from "react";

import {
    StyleSheet,
    ScrollView,
} from "react-native";

import { theme } from "../../../theme";

import WhereToGoBox from "../../components/tab-screens/bookingpage-screens/WhereToGoBox";
import OfferBanner from "../../components/tab-screens/bookingpage-screens/OfferBanner";
import VehicleTypeSelector from "../../components/tab-screens/bookingpage-screens/VehicleTypeSelector";
import PlacesSlider from "../../components/tab-screens/bookingpage-screens/PlacesSlider";
import AdBanner from "../../components/tab-screens/bookingpage-screens/AdBanner";

export default function BookRideScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <WhereToGoBox />

            <OfferBanner />

            <VehicleTypeSelector />

            <AdBanner />

            <PlacesSlider />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF0BE"
    },

    content: {
        flexGrow: 1,
        paddingVertical: theme.SPACING.md,
        //paddingBottom: 100,
    },
});