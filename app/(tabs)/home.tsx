import {
    View,
    StyleSheet,
} from "react-native";

import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import TopSwitchTabs from "../components/TopSwitchTabs";

import BookRideScreen from "../components/BookRideScreen";

import ParcelScreen from "../components/ParcelScreen";

export default function HomeScreen() {
    const [activeTab, setActiveTab] =
        useState<
            "book" | "parcel"
        >("book");

    return (
        <SafeAreaView
            style={styles.container}
            edges={["bottom"]}
        >
            <TopSwitchTabs
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {activeTab === "book" ? (
                <BookRideScreen />
            ) : (
                <ParcelScreen />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor:
            "#fff",
    },
});