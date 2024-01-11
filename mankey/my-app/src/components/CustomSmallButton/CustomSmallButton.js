import React, {useCallback} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, Pressable} from 'react-native'
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";


const CustomSmallButton = ({currentText, onPress}) => {

    const {height} = useWindowDimensions();

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
        <Pressable style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{currentText}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create (
    {
        container: {
            width: '100%',
            backgroundColor: '#9EB384',
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 12,
            marginTop: 10,
            display: "flex",
            alignContent: "center",
            alignItems: "center",

        },
        text: {
            color: '#1E1E1E',
            fontFamily: 'DM Serif Display',
        },
    }
)

export default CustomSmallButton;