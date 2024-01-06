import React from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, Pressable} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const CustomTabs = ({currentText, onPress}) => {

    const {height} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <Pressable style={styles.tab}>
                <Ionicons name="home-outline" size={24} color="#FAF1E4" style={styles.icon}/>
                <Text style={styles.text}>Home</Text>
            </Pressable>
            <Pressable style={styles.tab}>
                <AntDesign name="pluscircleo" size={24} color="#FAF1E4" style={styles.icon}/>
                <Text style={styles.text}>Add Task</Text>
            </Pressable>
            <Pressable style={styles.tab}>
                <MaterialCommunityIcons name="calendar-blank-multiple" size={24} color="#FAF1E4" style={styles.icon}/>
                <Text style={styles.text}>Calendar</Text>
            </Pressable>
            <Pressable style={styles.tab}>
                <Ionicons name="stats-chart" size={24} color="#FAF1E4" style={styles.icon}/>
                <Text style={styles.text}>Profile</Text>
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

export default CustomTabs;