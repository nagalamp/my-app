import {
    View,
    StyleSheet,
} from "react-native";

import { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import TopSwitchTabs from "../components/tab-screens/bookingpage-screens/TopSwitchTabs";
import BookRideScreen from "../components/tab-screens/BookRideScreen";
import ParcelScreen from "../components/tab-screens/ParcelScreen";

export default function HomeScreen() {
    const [activeTab, setActiveTab] =
        useState<"book" | "parcel">("book");

    return (
        <SafeAreaView
            style={styles.container}
            edges={["bottom"]}
        >
            <TopSwitchTabs
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            <View style={styles.content}>
                {activeTab === "book" ? (
                    <BookRideScreen />
                ) : (
                    <ParcelScreen />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    content: {
        flex: 1,
    },
});