import React from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, Pressable} from 'react-native'


const CustomBigButton = ({currentText, onPress}) => {

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
            backgroundColor: '#435334',
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 20,
            paddingBottom: 20,
            borderRadius: 12,
            marginTop: 20,
            display: "flex",
            alignContent: "center",
            alignItems: "center",


        },
        text: {
            color: '#FAF1E4',
        },
    }
)

export default CustomBigButton;