// app/(auth)/login.tsx

import React, { useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Image,
} from "react-native";

import { router } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosInstance from "../../api/axios";

import { theme } from "../../theme";

import {
    showSuccess,
    showError,
} from "../../utils/toast";

export default function LoginScreen() {
    const [mobile, setMobile] =
        useState("");

    const [otp, setOtp] =
        useState("");

    const [showOtp, setShowOtp] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [serverOtp, setServerOtp] =
        useState("");

    const sendOtp = async () => {
        try {
            if (mobile.length !== 10) {
                showError(
                    "Please enter a valid mobile number"
                );
                return;
            }

            setLoading(true);

            const response =
                await axiosInstance.post(
                    "/auth/send-otp",
                    {
                        mobile,
                        deviceType: "mobile",
                        userType: "customer",
                    }
                );

            if (response.data.success) {
                setShowOtp(true);

                setServerOtp(
                    response.data.otp
                );

                showSuccess(
                    response.data.message ||
                    "OTP sent successfully"
                );
            }
        } catch (error: any) {
            showError(
                error?.response?.data
                    ?.message ||
                "Failed to send OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        try {
            if (otp.length !== 6) {
                showError(
                    "Please enter a valid OTP"
                );
                return;
            }

            setLoading(true);

            const response =
                await axiosInstance.post(
                    "/auth/verify-otp",
                    {
                        mobile,
                        otp,
                        userType: "customer",
                    }
                );

            if (response.data.success) {
                await AsyncStorage.setItem(
                    "token",
                    response.data.token
                );

                await AsyncStorage.setItem(
                    "user",
                    JSON.stringify(
                        response.data.user
                    )
                );

                showSuccess(
                    "Login Successful"
                );

                router.replace("/home");
            }
        } catch (error: any) {
            showError(
                error?.response?.data
                    ?.message ||
                "OTP verification failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async () => {
        try {
            const response =
                await axiosInstance.post(
                    "/auth/send-otp",
                    {
                        mobile,
                        deviceType: "mobile",
                        userType: "customer",
                    }
                );

            if (response.data.success) {
                setServerOtp(
                    response.data.otp
                );

                showSuccess(
                    "OTP resent successfully"
                );
            }
        } catch {
            showError(
                "Failed to resend OTP"
            );
        }
    };

    const changeMobile = () => {
        setShowOtp(false);
        setOtp("");
        setServerOtp("");
        setMobile("");
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
        >
            <View
                style={styles.logoContainer}
            >
                <Image
                    source={require("../../assets/images/logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.welcome}>
                    Welcome Back
                </Text>
            </View>

            {!showOtp ? (
                <>
                    <Text style={styles.title}>
                        Sign In
                    </Text>

                    <Text
                        style={styles.subtitle}
                    >
                        Enter your mobile
                        number to continue
                    </Text>

                    <TextInput
                        value={mobile}
                        onChangeText={
                            setMobile
                        }
                        keyboardType="number-pad"
                        maxLength={10}
                        placeholder="Mobile Number"
                        placeholderTextColor={
                            theme.COLORS
                                .textMuted
                        }
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={sendOtp}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator
                                color="#FFFFFF"
                            />
                        ) : (
                            <Text
                                style={
                                    styles.buttonText
                                }
                            >
                                Send OTP
                            </Text>
                        )}
                    </TouchableOpacity>
                </>
            ) : (
                <>
                    <Text style={styles.title}>
                        Verify OTP
                    </Text>

                    <Text
                        style={styles.subtitle}
                    >
                        OTP sent to
                    </Text>

                    <Text style={styles.mobile}>
                        {mobile}
                    </Text>

                    {__DEV__ && (
                        <Text
                            style={
                                styles.demoOtp
                            }
                        >
                            OTP: {serverOtp}
                        </Text>
                    )}

                    <TextInput
                        value={otp}
                        onChangeText={setOtp}
                        keyboardType="number-pad"
                        maxLength={6}
                        placeholder="Enter OTP"
                        placeholderTextColor={
                            theme.COLORS
                                .textMuted
                        }
                        style={styles.input}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={verifyOtp}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator
                                color="#FFFFFF"
                            />
                        ) : (
                            <Text
                                style={
                                    styles.buttonText
                                }
                            >
                                Verify OTP
                            </Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={resendOtp}
                    >
                        <Text
                            style={styles.linkText}
                        >
                            Resend OTP
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={
                            changeMobile
                        }
                    >
                        <Text
                            style={
                                styles.changeText
                            }
                        >
                            Change Mobile
                            Number
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor:
            theme.COLORS.background,

        justifyContent: "center",

        paddingHorizontal:
            theme.SPACING.xl,
    },

    logoContainer: {
        alignItems: "center",

        marginBottom:
            theme.SPACING.xxxl,
    },

    logo: {
        width: 140,

        height: 140,

        marginBottom:
            theme.SPACING.md,
    },

    welcome: {
        textAlign: "center",

        color:
            theme.COLORS.textSecondary,

        fontSize:
            theme.FONT_SIZES.md,

        fontFamily:
            theme.FONT.medium,
    },

    title: {
        fontSize:
            theme.FONT_SIZES.xxl,

        color:
            theme.COLORS.text,

        fontFamily:
            theme.FONT.bold,

        marginBottom:
            theme.SPACING.sm,
    },

    subtitle: {
        fontSize:
            theme.FONT_SIZES.md,

        color:
            theme.COLORS.textSecondary,

        fontFamily:
            theme.FONT.medium,

        marginBottom:
            theme.SPACING.xl,
    },

    input: {
        height:
            theme.INPUT_HEIGHTS.lg,

        backgroundColor:
            theme.COLORS.white,

        borderWidth: 1,

        borderColor:
            theme.COLORS.gray300,

        borderRadius:
            theme.RADIUS.lg,

        paddingHorizontal:
            theme.SPACING.lg,

        fontSize:
            theme.FONT_SIZES.lg,

        color:
            theme.COLORS.text,

        fontFamily:
            theme.FONT.medium,

        marginBottom:
            theme.SPACING.xl,
    },

    otpInput: {
        height:
            theme.INPUT_HEIGHTS.lg,

        backgroundColor:
            theme.COLORS.white,

        borderWidth: 1,

        borderColor:
            theme.COLORS.gray300,

        borderRadius:
            theme.RADIUS.lg,

        paddingHorizontal:
            theme.SPACING.lg,

        textAlign: "center",

        letterSpacing: 8,

        fontSize:
            theme.FONT_SIZES.xl,

        color:
            theme.COLORS.text,

        fontFamily:
            theme.FONT.bold,

        marginBottom:
            theme.SPACING.xl,
    },

    button: {
        height:
            theme.BUTTON_HEIGHTS.lg,

        backgroundColor:
            theme.COLORS.secondary,

        borderRadius:
            theme.RADIUS.lg,

        justifyContent:
            "center",

        alignItems:
            "center",

        ...theme.SHADOWS.small,
    },

    buttonText: {
        color:
            theme.COLORS.white,

        fontSize:
            theme.FONT_SIZES.lg,

        fontFamily:
            theme.FONT.bold,
    },

    mobile: {
        color:
            theme.COLORS.text,

        fontSize:
            theme.FONT_SIZES.md,

        fontFamily:
            theme.FONT.medium,

        marginBottom:
            theme.SPACING.lg,
    },

    demoOtp: {
        textAlign: "center",

        color:
            theme.COLORS.secondary,

        fontFamily:
            theme.FONT.bold,

        marginBottom:
            theme.SPACING.lg,
    },

    linkText: {
        textAlign: "center",

        color:
            theme.COLORS.secondary,

        fontFamily:
            theme.FONT.bold,

        marginTop:
            theme.SPACING.xl,
    },

    changeText: {
        textAlign: "center",

        color:
            theme.COLORS.textSecondary,

        fontFamily:
            theme.FONT.medium,

        marginTop:
            theme.SPACING.md,
    },
});