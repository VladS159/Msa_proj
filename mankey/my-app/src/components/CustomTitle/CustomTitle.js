import React, {useCallback} from 'react'
import {Text, StyleSheet, SafeAreaView} from 'react-native'
import {useFonts} from "expo-font";
import * as SplashScreen from "expo-splash-screen";


const CustomTitle = ({titleText}) => {

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
        <SafeAreaView><Text style={styles.title}>{titleText}</Text></SafeAreaView>
    );
};

const styles = StyleSheet.create (
    {
        title: {
            fontFamily: 'DM Serif Display',
            color: 'black',
            fontSize: 30,
        },
    }
)

export default CustomTitle;