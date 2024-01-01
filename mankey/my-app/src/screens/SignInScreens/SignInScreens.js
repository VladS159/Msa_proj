import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput} from 'react-native'
import Banana from '../../../assets/images/Banana.jpg'
import CustomInput from "../../components/CustomInput";
import CustomBigButton from "../../components/CustomBigButton";
import CustomSmallButton from "../../components/CustomSmallButton/CustomSmallButton";
import {useNavigation} from "@react-navigation/native";
import {useForm, Controller} from 'react-hook-form'

const SignInScreens = () => {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        username: "",
        password: ""
    }});

    console.log(errors);

    const onSignInPress = (data) => {
        console.log(data);

        navigation.navigate("SignIn");
    };

    const onSignUpPress = () => {
        console.warn('oN');

        navigation.navigate("SignUp");
    };

    const {height} = useWindowDimensions();

    return (
        <View style={styles.root}>
            <Text>Monkei Business</Text>
            {//<Image source={Banana} style={[styles.logo, {height: height * 0.3 }]} resizeMode={'contain'}/>}
            }
            <CustomInput
                name = "username" 
                placeholder = 'Username'
                control = {control}
                rules = {{required: 'Username field must not be empty.'}}>
            </CustomInput>
            <CustomInput
                name = "password" 
                placeholder = 'Password'
                secureTextEntry
                control = {control}
                rules = {{required: 'Password field must not be empty.', minLength: {value: 6, message: 'Password should be at least 6 characters long.'}}}>
            </CustomInput>
            <CustomBigButton currentText={"Log in"} onPress={handleSubmit(onSignInPress)}></CustomBigButton>
            <CustomSmallButton currentText={"Sign Up"} onPress={onSignUpPress}></CustomSmallButton>
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
            display: "flex",
            width: "100%",
            alignItems: 'center',
            padding: 20,
            // borderStyle: "solid",
            // borderColor: "red",
            // borderWidth: 4,
        },
    }
)

export default SignInScreens;