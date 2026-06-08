// app/components/LocationInput.tsx

import React, {
  useRef,
  useState,
} from "react";

import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from "react-native";

import {
  Ionicons,
} from "@expo/vector-icons";

import {
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

const GOOGLE_API_KEY =
  process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export type LocationType = {
  address: string;
  latitude: number;
  longitude: number;
  details?: any;
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

  const [showList, setShowList] =
    useState(false);

  const clearInput = () => {
    onChangeText("");

    inputRef.current?.setAddressText(
      ""
    );

    setShowList(false);
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={inputRef}
        placeholder={placeholder}
        fetchDetails
        debounce={200}
        minLength={2}
        enablePoweredByContainer={false}
        keyboardShouldPersistTaps="handled"
        keepResultsAfterBlur={false}
        predefinedPlaces={[]}
        currentLocation={false}
        listViewDisplayed={
          showList
            ? "auto"
            : false
        }
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        onPress={(
          data,
          details = null
        ) => {
          const location = {
            address:
              details?.formatted_address ||
              data.description,

            latitude:
              details?.geometry
                ?.location?.lat || 0,

            longitude:
              details?.geometry
                ?.location?.lng || 0,

            details,
          };

          onSelect(location);

          inputRef.current?.setAddressText(
            location.address
          );

          setShowList(false);
        }}
        textInputProps={{
          value,

          onChangeText: (
            text: string
          ) => {
            onChangeText(text);

            setShowList(
              text.trim().length >=
              2
            );
          },

          placeholderTextColor:
            "#999",

          onFocus: () => {
            if (
              value.trim().length >=
              2
            ) {
              setShowList(
                true
              );
            }
          },
        }}
        renderRow={(
          rowData
        ) => (
          <View
            style={styles.row}
          >
            <Text
              style={
                styles.rowText
              }
            >
              {
                rowData.description
              }
            </Text>
          </View>
        )}
        styles={{
          container: {
            flex: 0,
            zIndex: 9999,
          },

          textInputContainer: {
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            backgroundColor:
              "#fff",
            paddingHorizontal: 8,
          },

          textInput: {
            height: 50,
            fontSize: 16,
            color: "#000",
            paddingRight: 40,
            marginBottom: 0,
          },

          listView: {
            position:
              "absolute",
            top: 58,
            left: 0,
            right: 0,

            backgroundColor:
              "#fff",

            borderWidth: 1,
            borderColor:
              "#eee",
            borderRadius: 12,

            maxHeight: 250,

            zIndex: 99999,
            elevation: 20,

            shadowColor:
              "#000",

            shadowOpacity:
              0.15,

            shadowRadius: 8,

            shadowOffset: {
              width: 0,
              height: 4,
            },
          },
        }}
      />

      {value.trim().length >
        0 && (
          <TouchableOpacity
            onPress={
              clearInput
            }
            style={
              styles.clearButton
            }
          >
            <Ionicons
              name="close-circle"
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      width: "100%",
      position:
        "relative",

      zIndex:
        Platform.OS ===
          "ios"
          ? 9999
          : 1,
    },

    clearButton: {
      position:
        "absolute",
      right: 14,
      top: 14,
      zIndex: 100000,
    },

    row: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor:
        "#f1f1f1",
    },

    rowText: {
      fontSize: 14,
      color: "#000",
    },
  });