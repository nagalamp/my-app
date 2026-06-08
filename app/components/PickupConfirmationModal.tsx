import React from "react";

import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import {
    MaterialCommunityIcons,
} from "@expo/vector-icons";

import { theme } from "../../theme";

type Props = {
    visible: boolean;
    pickupAddress: string;
    onClose: () => void;
    onConfirm: () => void;
};

export default function PickupConfirmationModal({
    visible,
    pickupAddress,
    onClose,
    onConfirm,
}: Props) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
        >
            <View
                style={
                    styles.overlay
                }
            >
                <View
                    style={
                        styles.container
                    }
                >
                    <View
                        style={
                            styles.iconContainer
                        }
                    >
                        <MaterialCommunityIcons
                            name="map-marker-radius"
                            size={60}
                            color={
                                theme
                                    .COLORS
                                    .primary
                            }
                        />
                    </View>

                    <Text
                        style={
                            styles.title
                        }
                    >
                        Confirm Pickup
                        Location
                    </Text>

                    <Text
                        style={
                            styles.subtitle
                        }
                    >
                        Driver will pick
                        you up from:
                    </Text>

                    <View
                        style={
                            styles.addressBox
                        }
                    >
                        <Text
                            style={
                                styles.address
                            }
                        >
                            {
                                pickupAddress
                            }
                        </Text>
                    </View>

                    <View
                        style={
                            styles.buttonContainer
                        }
                    >
                        <TouchableOpacity
                            style={
                                styles.cancelButton
                            }
                            onPress={
                                onClose
                            }
                        >
                            <Text
                                style={
                                    styles.cancelText
                                }
                            >
                                Change
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={
                                styles.confirmButton
                            }
                            onPress={
                                onConfirm
                            }
                        >
                            <Text
                                style={
                                    styles.confirmText
                                }
                            >
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles =
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor:
                "rgba(0,0,0,0.5)",
            justifyContent:
                "flex-end",
        },

        container: {
            backgroundColor:
                "#FFF",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
        },

        iconContainer: {
            alignItems:
                "center",
            marginBottom: 16,
        },

        title: {
            fontSize: 22,
            fontWeight: "700",
            textAlign:
                "center",
            marginBottom: 10,
        },

        subtitle: {
            fontSize: 14,
            textAlign:
                "center",
            color: "#6B7280",
            marginBottom: 16,
        },

        addressBox: {
            backgroundColor:
                "#F9FAFB",
            padding: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor:
                "#E5E7EB",
        },

        address: {
            fontSize: 15,
            color: "#111827",
            lineHeight: 22,
        },

        buttonContainer: {
            flexDirection:
                "row",
            marginTop: 24,
        },

        cancelButton: {
            flex: 1,
            height: 52,
            borderRadius: 12,
            borderWidth: 1,
            borderColor:
                "#D1D5DB",
            justifyContent:
                "center",
            alignItems:
                "center",
            marginRight: 8,
        },

        confirmButton: {
            flex: 1,
            height: 52,
            borderRadius: 12,
            backgroundColor:
                theme.COLORS
                    .primary,
            justifyContent:
                "center",
            alignItems:
                "center",
            marginLeft: 8,
        },

        cancelText: {
            fontWeight: "600",
        },

        confirmText: {
            color: "#FFF",
            fontWeight: "700",
        },
    });