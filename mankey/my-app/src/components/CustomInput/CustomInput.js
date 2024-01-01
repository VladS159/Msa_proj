import React from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput} from 'react-native'


const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {

    const {height} = useWindowDimensions();

    return (
        <View style={styles.container}>
            <TextInput placeholder={placeholder}
                       value={value}
                       onChangeText={setValue}
                       placeholderTextColor="#9EB384"
                       secureTextEntry={secureTextEntry}
                       style={styles.input}></TextInput>
        </View>
    );
};

const styles = StyleSheet.create (
    {
        container: {
            width: '100%',
            display: "flex",
            alignContent: "center",
            alignItems: "center",
        },
        input: {
            width: "50%",
            alignItems: 'center',
            padding: 20,
            borderColor: '#9EB384',
            borderBottomWidth: 1,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            color: '#9EB384',
            textAlign: 'center',
        },
        
    }
)

export default CustomInput;