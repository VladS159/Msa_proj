import React, {useCallback} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, Pressable} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";


const CustomTabs = ({currentFocusedTab}) => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        'DM Serif Display': require('../../assets/fonts/DMSerifDisplay-Regular.ttf'),
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Pressable style={currentFocusedTab == 0 ? styles.tabFocused : styles.tab} onPress={() => navigation.navigate('Home')}>
                <View style={styles.icon}><Ionicons name="home-outline" size={24} color={currentFocusedTab == 0 ?"#F5A800" : "#FAF1E4"}/></View>
                <Text style={currentFocusedTab == 0 ? styles.textFocused : styles.text}>Home</Text>
            </Pressable>
            <Pressable style={currentFocusedTab == 1 ? styles.tabFocused : styles.tab} onPress={() => navigation.navigate('AddTask')}>
                <View style={styles.icon}><AntDesign name="pluscircleo" size={24} color={currentFocusedTab == 1 ?"#F5A800" : "#FAF1E4"}/></View>
                <Text style={currentFocusedTab == 1 ? styles.textFocused : styles.text}>Add Task</Text>
            </Pressable>
            <Pressable style={currentFocusedTab == 2 ? styles.tabFocused : styles.tab} onPress={() => navigation.navigate('Calendar')}>
                <View style={styles.icon}><MaterialCommunityIcons name="calendar-blank-multiple" size={24} color={currentFocusedTab == 2 ?"#F5A800" : "#FAF1E4"}/></View>
                <Text style={currentFocusedTab == 2 ? styles.textFocused : styles.text}>Calendar</Text>
            </Pressable>
            <Pressable style={currentFocusedTab == 3 ? styles.tabFocused : styles.tab} onPress={() => navigation.navigate('Profile')}>
                <View style={styles.icon}><Ionicons name="stats-chart" size={24} color={currentFocusedTab == 3 ?"#F5A800" : "#FAF1E4"}/></View>
                <Text style={currentFocusedTab == 3 ? styles.textFocused : styles.text}>Profile</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create (
    {
        container: {
            backgroundColor: '#435334',
            margin: 0,
            width: '100%',
            alignSelf: 'stretch',
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 20,
        },
        text: {
            color: '#FAF1E4',
            textAlign: "center",
            fontFamily: 'DM Serif Display',
        },
        textFocused: {
            color: '#F5A800',
            textAlign: "center",
            fontWeight: "bold",
            fontFamily: 'DM Serif Display',
        },
        tab: {
            display: "flex",
            justifyContent: "center",
            borderRadius: 20,
            padding: 10,
            //width: "25%",
        },
        tabFocused: {
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#FAF1E4",
            borderRadius: 20,
            width: "25%",
        },
        icon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            //borderWidth: 1,
            //borderColor: "red",
            //borderStyle: "solid",
        },
    }
)

export default CustomTabs;