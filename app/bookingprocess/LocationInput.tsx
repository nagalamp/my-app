// app/components/LocationInput.tsx

import React, {
  useEffect,
  useRef,
} from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

export type LocationType = {
  address: string;
  latitude: number;
  longitude: number;
};

type Props = {
  placeholder: string;
  value: string;

  onChangeText: (
    text: string
  ) => void;

  onSelect: (
    location: LocationType
  ) => void;
};

export default function LocationInput({
  placeholder,
  value,
  onChangeText,
  onSelect,
}: Props) {
  const inputRef =
    useRef<any>(null);

  useEffect(() => {
    if (
      inputRef.current
    ) {
      inputRef.current.setAddressText(
        value
      );
    }
  }, [value]);

  const handleClear = () => {
    onChangeText("");

    if (
      inputRef.current
    ) {
      inputRef.current.setAddressText(
        ""
      );
    }
  };

  return (
    <View
      style={
        styles.container
      }
    >
      <View
        style={
          styles.inputContainer
        }
      >
        <GooglePlacesAutocomplete
          ref={inputRef}
          placeholder={
            placeholder
          }
          fetchDetails
          enablePoweredByContainer={
            false
          }
          debounce={300}
          minLength={2}
          nearbyPlacesAPI="GooglePlacesSearch"
          query={{
            key: process.env
              .EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
            language:
              "en",
            components:
              "country:in",
          }}
          onPress={(
            data,
            details =
              null
          ) => {
            if (
              !details
            )
              return;

            const location =
            {
              address:
                data.description,

              latitude:
                details
                  .geometry
                  .location
                  .lat,

              longitude:
                details
                  .geometry
                  .location
                  .lng,
            };

            onSelect(
              location
            );
          }}
          textInputProps={{
            value,
            onChangeText,
          }}
          styles={{
            textInput:
              styles.input,

            container:
              styles.autocompleteContainer,

            listView:
              styles.listView,
          }}
        />

        {value.length >
          0 && (
            <TouchableOpacity
              style={
                styles.clearButton
              }
              onPress={
                handleClear
              }
            >
              <Ionicons
                name="close-circle"
                size={22}
                color="#94A3B8"
              />
            </TouchableOpacity>
          )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      width: "100%",
    },

    inputContainer: {
      position:
        "relative",
    },

    autocompleteContainer:
    {
      flex: 0,
    },

    input: {
      height: 56,

      borderWidth: 1,

      borderColor:
        "#E5E7EB",

      borderRadius: 12,

      paddingLeft: 16,

      paddingRight: 45,

      fontSize: 16,

      backgroundColor:
        "#FFF",
    },

    clearButton: {
      position:
        "absolute",

      right: 14,

      top: 17,

      zIndex: 9999,
    },

    listView: {
      backgroundColor:
        "#FFF",

      borderRadius: 12,

      marginTop: 4,

      elevation: 5,

      shadowColor:
        "#000",

      shadowOpacity:
        0.1,

      shadowRadius: 5,
    },
  });