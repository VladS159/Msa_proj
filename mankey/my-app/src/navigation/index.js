import React from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreens from "../screens/SignInScreens";
import SignUpScreens from "../screens/SignUpScreens";
import HomeScreens from '../screens/HomeScreens';
import AddTaskScreens from '../screens/AddTaskScreens';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer style={{margin: 0}}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="AddTask" component={AddTaskScreens} style={{width: "500px"}}></Stack.Screen>
                <Stack.Screen name="Home" component={HomeScreens} style={{width: "500px"}}></Stack.Screen>
                <Stack.Screen name="SignIn" component={SignInScreens} style={{width: "500px"}}></Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUpScreens} style={{width: "500px"}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;