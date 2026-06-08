// components/LocationInput.tsx

import React from "react";

import {
    StyleSheet,
    View,
} from "react-native";

import {
    GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

export type LocationType = {
    address: string;
    latitude: number;
    longitude: number;
};

type Props = {
    placeholder?: string;
    onLocationSelect: (location: LocationType) => void;
};

const GOOGLE_API_KEY =
    process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export default function LocationInput({
    placeholder = "Enter location",
    onLocationSelect,
}: Props) {
    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={placeholder}
                fetchDetails
                enablePoweredByContainer={false}
                query={{
                    key: GOOGLE_API_KEY,
                    language: "en",
                    components: "country:in",
                }}
                onPress={(data, details = null) => {
                    if (!details) return;

                    onLocationSelect({
                        address: data.description,
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                    });
                }}
                styles={{
                    container: styles.autocompleteContainer,
                    textInput: styles.input,
                    listView: styles.listView,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    autocompleteContainer: {
        flex: 0,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: "#FFFFFF",
    },

    listView: {
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: "#FFFFFF",
    },
});