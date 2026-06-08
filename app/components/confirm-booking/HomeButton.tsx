import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

import {
    Ionicons,
} from "@expo/vector-icons";

type Props = {
    onPress: () => void;
};

export default function HomeButton({
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Ionicons
                name="home"
                size={20}
                color="#111827"
            />

            <Text style={styles.text}>
                Back to Home
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 56,
        borderRadius: 16,
        backgroundColor: "#F59E0B",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
    },
});