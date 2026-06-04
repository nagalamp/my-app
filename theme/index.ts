// src/theme/index.ts

export const theme = {
    COLORS: {
        // Brand Colors
        primary: "#FFD700",
        secondary: "#FF3300",

        // Backgrounds
        background: "#FFD700",
        surface: "#FFFFFF",
        card: "#FFFFFF",

        // Text
        text: "#111111",
        textSecondary: "#666666",
        textMuted: "#999999",
        textWhite: "#FFFFFF",

        // Borders
        border: "#D6D3C9",
        divider: "#ECECEC",

        // Status
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#3B82F6",

        // Generic
        white: "#FFFFFF",
        black: "#000000",
        transparent: "transparent",

        // Overlay
        overlay: "rgba(0,0,0,0.5)",

        // Ride Types
        bike: "#FFD700",
        auto: "#FFB800",
        cab: "#FF3300",

        // Extra Shades
        yellowDark: "#B89B00",
        yellowLight: "#FFF4A3",

        orangeDark: "#CC2900",
        orangeLight: "#FF8A66",

        gray100: "#F8F8F8",
        gray200: "#ECECEC",
        gray300: "#D9D9D9",
        gray400: "#BDBDBD",
        gray500: "#999999",
        gray600: "#666666",
        gray700: "#444444",
        gray800: "#222222",
    },

    FONT: {
        light: "Comfortaa_300Light",
        regular: "Comfortaa_400Regular",
        medium: "Comfortaa_500Medium",
        semiBold: "Comfortaa_600SemiBold",
        bold: "Comfortaa_700Bold",
    },

    FONT_SIZES: {
        xs: 10,
        sm: 12,
        md: 14,
        lg: 16,
        xl: 20,
        xxl: 28,
        xxxl: 36,
        title: 42,
    },

    LINE_HEIGHTS: {
        xs: 14,
        sm: 18,
        md: 22,
        lg: 26,
        xl: 30,
    },

    LETTER_SPACING: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
        wider: 1,
    },

    SPACING: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        xxl: 24,
        xxxl: 32,
        huge: 40,
    },

    RADIUS: {
        xs: 4,
        sm: 6,
        md: 10,
        lg: 16,
        xl: 24,
        xxl: 32,
        round: 999,
    },

    ICON_SIZES: {
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
        xl: 32,
        xxl: 48,
    },

    BUTTON_HEIGHTS: {
        sm: 40,
        md: 48,
        lg: 56,
    },

    INPUT_HEIGHTS: {
        sm: 44,
        md: 52,
        lg: 60,
    },

    HEADER_HEIGHTS: {
        sm: 50,
        md: 60,
        lg: 70,
    },

    OPACITY: {
        disabled: 0.5,
        pressed: 0.7,
        hidden: 0,
    },

    Z_INDEX: {
        base: 1,
        dropdown: 100,
        sticky: 500,
        overlay: 1000,
        modal: 2000,
        toast: 3000,
    },

    SHADOWS: {
        none: {},

        small: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },

        medium: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 6,
            elevation: 4,
        },

        large: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 8,
        },
    },

    ANIMATION: {
        fast: 150,
        normal: 300,
        slow: 500,
    },
};

export default theme;