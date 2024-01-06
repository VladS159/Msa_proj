import React, {useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput} from 'react-native'
import Banana from '../../../assets/images/Banana.jpg'
import CustomInput from "../../components/CustomInput";
import CustomBigButton from "../../components/CustomBigButton";
import CustomSmallButton from "../../components/CustomSmallButton/CustomSmallButton";
import {TabRouter, useNavigation} from "@react-navigation/native";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTabs from "../../components/CustomTabs/CustomTabs";

const HomeScreens = () => {

    const navigation = useNavigation();

    const onLogOutPress = () => {
        //console.warn('oN');
        AsyncStorage.removeItem('authToken');
        navigation.navigate("SignIn");
    };
    
return (
    <View style={styles.root}>
        <Text>Home sweet home</Text>
        <CustomBigButton currentText={"Log out"} onPress={onLogOutPress}></CustomBigButton>
        <CustomTabs></CustomTabs>
    </View>
);
};

const styles = StyleSheet.create (
{
    logo: {
        width: 100,
        maxHeight: 100,
        maxWidth: 300,
    },
    root: {
        flex: 1,
        justifyContent: 'space-between',
        display: "flex",
        width: "100%",
        alignItems: 'center',
        alignContent: "center",
        // borderStyle: "solid",
        // borderColor: "red",
        // borderWidth: 4,
    },
}
)

export default HomeScreens;