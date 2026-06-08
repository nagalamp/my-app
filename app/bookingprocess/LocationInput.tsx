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

  const handleClear =
    () => {
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
          styles.inputWrapper
        }
      >
        <GooglePlacesAutocomplete
          ref={inputRef}
          placeholder={
            placeholder
          }
          fetchDetails
          debounce={300}
          minLength={2}
          enablePoweredByContainer={
            false
          }
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

            const location: LocationType =
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
            placeholderTextColor:
              "#94A3B8",
          }}
          styles={{
            container:
              styles.autocompleteContainer,

            textInput:
              styles.input,

            listView:
              styles.listView,

            row:
              styles.row,

            separator:
              styles.separator,
          }}
          renderLeftButton={() => (
            <View
              style={
                styles.leftIcon
              }
            >
              <Ionicons
                name="location-outline"
                size={
                  20
                }
                color="#64748B"
              />
            </View>
          )}
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
                size={
                  22
                }
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

    inputWrapper: {
      position:
        "relative",
    },

    autocompleteContainer:
    {
      flex: 0,
    },

    input: {
      height: 58,

      borderWidth: 1,

      borderColor:
        "#E5E7EB",

      borderRadius: 14,

      backgroundColor:
        "#FFFFFF",

      paddingLeft: 48,

      paddingRight: 45,

      fontSize: 15,

      color:
        "#111827",
    },

    leftIcon: {
      position:
        "absolute",

      left: 14,

      top: 18,

      zIndex: 1000,
    },

    clearButton: {
      position:
        "absolute",

      right: 14,

      top: 18,

      zIndex: 9999,
    },

    listView: {
      marginTop: 6,

      borderRadius: 14,

      backgroundColor:
        "#FFFFFF",

      borderWidth: 1,

      borderColor:
        "#E5E7EB",

      elevation: 5,

      shadowColor:
        "#000",

      shadowOffset: {
        width: 0,
        height: 2,
      },

      shadowOpacity:
        0.1,

      shadowRadius: 6,

      maxHeight: 300,
    },

    row: {
      paddingVertical: 14,

      paddingHorizontal: 16,
    },

    separator: {
      height: 1,

      backgroundColor:
        "#F1F5F9",
    },
  });