import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { theme } from "../../theme";

import { showSuccess } from "../../utils/toast";

export default function ProfileScreen() {
    const handleLogout = async () => {
        await AsyncStorage.multiRemove([
            "token",
            "user",
        ]);

        showSuccess(
            "Logged out successfully"
        );

        router.replace("/login");
    };

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={["top"]}
        >
            <View style={styles.container}>
                <Text style={styles.title}>
                    Profile
                </Text>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.COLORS.background,
    },

    container: {
        flex: 1,
        justifyContent: "center",
        padding: theme.SPACING.xl,
    },

    title: {
        textAlign: "center",
        fontFamily: theme.FONT.bold,
        fontSize: theme.FONT_SIZES.xxl,
        color: theme.COLORS.secondary,
        marginBottom: 40,
    },

    logoutButton: {
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.COLORS.danger,
        borderRadius: theme.RADIUS.lg,
    },

    logoutText: {
        color: theme.COLORS.white,
        fontFamily: theme.FONT.bold,
        fontSize: theme.FONT_SIZES.lg,
    },
});