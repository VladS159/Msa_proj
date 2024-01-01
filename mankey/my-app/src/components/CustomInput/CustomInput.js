import React from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput} from 'react-native'
import {Controller} from 'react-hook-form'


const CustomInput = ({control, name, rules = {}, placeholder, secureTextEntry}) => {

    const {height} = useWindowDimensions();

    return (
        <Controller
            control = {control}
            name = {name}
            rules = {rules}
            render = {({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View style={styles.container}>
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            style={[styles.input, {borderColor: error ? 'red' : '#9EB384'}]}
                            secureTextEntry={secureTextEntry}
                        />
                    </View>
                    {error && (
                        <Text style = {{color: 'red', alignSelf: 'center'}}>{error.message || 'Error'}</Text>
                    )} 
                </>
            )}
        />
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