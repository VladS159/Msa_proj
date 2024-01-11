import React, {useCallback, useEffect} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, Pressable} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const CustomTask = ({taskName, taskDate, onComplete, onDelete, controlButtons}) => {

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
        <View style={styles.root}>
            <View style={styles.container}>
                <Text style={{fontFamily: 'DM Serif Display'}}>
                    {taskName}
                </Text>
                <Text style={{fontFamily: 'DM Serif Display'}}>
                    {taskDate}
                </Text>
            </View>
            { controlButtons === true &&
            <>
                <Pressable style={styles.complete} onPress={onComplete}><Entypo name="check" size={24} color="black" /></Pressable>
                <Pressable style={styles.complete} onPress={onDelete}><Ionicons name="close" size={24} color="black" /></Pressable>
            </>
            }
        </View>
    );
};

const styles = StyleSheet.create (
    {
        container: {
            backgroundColor: '#9EB384',
            borderRadius: 20,
            width: '75%',
            alignSelf: 'stretch',
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
        },
        root: {
            display: "flex",
            flexDirection: "row",
            gap: 10,
            width: "90%",
            marginTop: 10,
            justifyContent: "center",

        },
        complete: {
            backgroundColor: '#9EB384',
            borderRadius: 20,
            padding: 10,
        },
        text: {
            color: '#FAF1E4',
        },
        tab: {
            display: "flex",
            justifyContent: "center",
        },
        icon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    }
)

export default CustomTask;