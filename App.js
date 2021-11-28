import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableWithoutFeedback,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';

import getResponsiveDimention from "./utils/getResponsiveDimention";

const themes = {
    dark: {
        "#000": "#000",
        "#FFF": "#FFF",
        "#393A35": "#393A35",
        "#E1F488": "#E1F488",
        "rgba(255, 255, 255, 0.4)": "rgba(255, 255, 255, 0.4)",
        "rgba(0, 0, 0, 0.4)": "rgba(0, 0, 0, 0.4)",
    },
    light: {
        "#000": "#CDCDC5",
        "#FFF": "#000",
        "#393A35": "#BEBCAF",
        "#E1F488": "#E1F488",
        "rgba(255, 255, 255, 0.4)": "rgba(255, 255, 255, 0.4)",
        "rgba(0, 0, 0, 0.4)": "rgba(0, 0, 0, 0.4)",
    },
};

const App = () => {
    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
    });
    const [theme, setTheme] = useState("dark");
    const colors = themes[theme];
    const onToogleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success) ;
    };
    const [loading, setLoading] = useState(false);
    const [channels, setChannels] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [channelsData, setChannelsData] = useState({
        1: {
            chanel: 1,
            name: "chanel 1",
            status: 0,
        },
        2: {
            chanel: 2,
            name: "chanel 2",
            status: 0,
        },
        3: {
            chanel: 3,
            name: "chanel 3",
            status: 0,
        },
        4: {
            chanel: 4,
            name: "chanel 4",
            status: 0,
        },
        5: {
            chanel: 5,
            name: "chanel 5",
            status: 0,
        },
        6: {
            chanel: 6,
            name: "chanel 6",
            status: 0,
        },
        7: {
            chanel: 7,
            name: "chanel 7",
            status: 0,
        },
        8: {
            chanel: 8,
            name: "chanel 8",
            status: 0,
        },
    });

    const onPressChanel = (chanel) => {
      setChannelsData({
        ...channelsData,
        [chanel]: {
          ...channelsData[chanel],
          status: channelsData[chanel].status === 0 ? 1 : 0
        }
      });
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)  ;
    };

    const renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text
                    style={StyleSheet.flatten([
                        styles.title,
                        { color: colors["#FFF"] },
                    ])}
                >
                    Remote
                </Text>
            </View>
        );
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => onPressChanel(item)}>
                <View
                    style={StyleSheet.flatten([
                        styles.chanel,
                        {
                            backgroundColor:
                            channelsData[item].status === 0
                                    ? colors["#393A35"]
                                    : colors["#E1F488"],
                        },
                        index % 2 === 0 ? styles.chanelMargin : {},
                    ])}
                >
                    <Feather
                        name="activity"
                        size={getResponsiveDimention(72)}
                        color={
                          channelsData[item].status === 0 ? colors["#FFF"] : "#000"
                        }
                    />
                    <View style={styles.chanelContentContainer}>
                        <Text
                            style={StyleSheet.flatten([
                                styles.chanelName,
                                { color: channelsData[item].status === 0 ? colors["#FFF"] : "#000" },
                            ])}
                        >
                            {channelsData[item].name}
                        </Text>
                        <Text
                            style={StyleSheet.flatten([
                                styles.chanelStatus,
                                {
                                    color:
                                    channelsData[item].status === 0
                                            ? colors["rgba(255, 255, 255, 0.4)"]
                                            : colors["rgba(0, 0, 0, 0.4)"],
                                },
                            ])}
                        >
                            {channelsData[item].status === 0 ? "Off" : "On"}
                        </Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const renderItemSeparator = () => {
        return <View style={styles.separator} />;
    };

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <View style={styles.toolbarSeparatorContainer}>
                    <View
                        style={StyleSheet.flatten([
                            styles.toolbarSeparator,
                            { backgroundColor: colors["#393A35"] },
                        ])}
                    />
                </View>
                <View style={styles.toolbarContainer}>
                    <View
                        style={StyleSheet.flatten([
                            styles.toolbarButton,
                            { borderColor: colors["#FFF"] },
                        ])}
                    >
                        <MaterialIcons
                            name="mode-edit"
                            size={getResponsiveDimention(59.6)}
                            color={colors["#FFF"]}
                        />
                    </View>
                    <View
                        style={StyleSheet.flatten([
                            styles.toolbarButton,
                            { borderColor: colors["#FFF"] },
                        ])}
                    >
                        <MaterialIcons
                            name="settings"
                            size={getResponsiveDimention(62.09)}
                            color={colors["#FFF"]}
                        />
                    </View>
                    <TouchableWithoutFeedback onPress={onToogleTheme}>
                        <View
                            style={StyleSheet.flatten([
                                styles.toolbarButton,
                                { borderColor: colors["#FFF"] },
                            ])}
                        >
                            <MaterialIcons
                                name={
                                    theme === "dark"
                                        ? "nightlight-round"
                                        : "wb-sunny"
                                }
                                size={getResponsiveDimention(62.09)}
                                color={colors["#FFF"]}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View
                    style={StyleSheet.flatten([
                        styles.voiceInputContainer,
                        { backgroundColor: colors["#393A35"] },
                    ])}
                >
                    <MaterialIcons
                        name="mic"
                        size={getResponsiveDimention(100)}
                        color={colors["#FFF"]}
                    />
                </View>
            </View>
        );
    };

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <SafeAreaView
            style={StyleSheet.flatten([
                styles.safeArea,
                { backgroundColor: colors["#000"] },
            ])}
        >
            <StatusBar style={theme} />
            <View
                style={StyleSheet.flatten([
                    styles.container,
                    { backgroundColor: colors["#000"] },
                ])}
            >
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator
                            size="large"
                            color={colors["#E1F488"]}
                        />
                    </View>
                ) : (
                    <View style={styles.contentContainer}>
                        <FlatList
                            ListHeaderComponent={renderHeader}
                            data={channels}
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderItemSeparator}
                            keyExtractor={(item) => `chanel${channelsData[item].chanel}`}
                            numColumns={2}
                            ListFooterComponent={renderFooter}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        flex: 1,
        paddingLeft: getResponsiveDimention(50),
        paddingRight: getResponsiveDimention(50),
    },
    header: {
        width: "100%",
        height: getResponsiveDimention(350),
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: getResponsiveDimention(100),
    },
    title: {
        fontFamily: "Poppins-Regular",
        fontSize: getResponsiveDimention(120),
        lineHeight: getResponsiveDimention(180),
    },
    chanel: {
        paddingLeft: getResponsiveDimention(57.26),
        paddingRight: getResponsiveDimention(50),
        width: getResponsiveDimention(653),
        height: getResponsiveDimention(314),
        borderRadius: getResponsiveDimention(100),
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    chanelMargin: {
        marginRight: getResponsiveDimention(35),
    },
    chanelContentContainer: {
        marginLeft: getResponsiveDimention(40),
    },
    chanelName: {
        fontFamily: "Poppins-Medium",
        fontSize: getResponsiveDimention(48),
        lineHeight: getResponsiveDimention(72),
        textTransform: "capitalize",
    },
    chanelStatus: {
        fontFamily: "Poppins-Regular",
        fontSize: getResponsiveDimention(48),
        lineHeight: getResponsiveDimention(60),

        textTransform: "capitalize",
    },
    separator: {
        width: "100%",
        height: getResponsiveDimention(35),
    },
    footer: {
        marginTop: getResponsiveDimention(80),
        width: "100%",
    },
    toolbarSeparatorContainer: {
        width: "100%",
        height: getResponsiveDimention(18),
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    toolbarSeparator: {
        width: getResponsiveDimention(100),
        height: getResponsiveDimention(18),
        borderRadius: getResponsiveDimention(60),
        overflow: "hidden",
    },
    toolbarContainer: {
        marginTop: getResponsiveDimention(50),
        width: "100%",
        height: getResponsiveDimention(165),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    toolbarButton: {
        width: getResponsiveDimention(386.33),
        height: getResponsiveDimention(165.57),
        borderWidth: getResponsiveDimention(1),
        borderStyle: "solid",
        borderRadius: getResponsiveDimention(85),
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    voiceInputContainer: {
        marginTop: getResponsiveDimention(50),
        width: "100%",
        height: getResponsiveDimention(730),

        borderRadius: getResponsiveDimention(90),
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default App;
