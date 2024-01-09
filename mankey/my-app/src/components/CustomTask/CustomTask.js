import React from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, Pressable} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';

const CustomTask = ({taskName, taskDate, onComplete, onDelete}) => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Text>
                    {taskName}
                </Text>
                <Text>
                    {taskDate}
                </Text>
            </View>
            <Pressable style={styles.complete} onPress={onComplete}><Entypo name="check" size={24} color="black" /></Pressable>
            <Pressable style={styles.complete} onPress={onDelete}><Ionicons name="close" size={24} color="black" /></Pressable>
        </View>
    );
};

const styles = StyleSheet.create (
    {
        container: {
            backgroundColor: '#9EB384',
            borderRadius: 20,
            margin: 0,
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
            width: "100%",
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