import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "../../theme";
import AppHeader from "../components/app-header/AppHeader";

export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                header: () => <AppHeader />,

                tabBarActiveTintColor:
                    theme.COLORS.secondary,

                tabBarInactiveTintColor:
                    theme.COLORS.gray500,

                tabBarStyle: {
                    backgroundColor:
                        theme.COLORS.surface,

                    borderTopColor:
                        theme.COLORS.border,

                    height: 60 + insets.bottom,

                    paddingBottom:
                        insets.bottom,
                    paddingTop: 5,
                },

                tabBarLabelStyle: {
                    fontFamily:
                        theme.FONT.medium,
                    fontSize: 12,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",

                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <Ionicons
                            name="home"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",

                    tabBarIcon: ({
                        color,
                        size,
                    }) => (
                        <Ionicons
                            name="person"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}