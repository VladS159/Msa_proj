import React from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, Pressable} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

const CustomTask = ({taskName, taskDate}) => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>
                {taskName}
            </Text>
            <Text>
                {taskDate}
            </Text>
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