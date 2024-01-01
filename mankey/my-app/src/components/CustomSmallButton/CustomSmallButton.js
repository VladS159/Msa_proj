import React from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, Pressable} from 'react-native'


const CustomSmallButton = ({currentText, onPress}) => {

    const {height} = useWindowDimensions();

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
        },
    }
)

export default CustomSmallButton;