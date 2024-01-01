import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native'
import Banana from '../../../assets/images/Banana.jpg'
import CustomInput from "../../components/CustomInput";
import CustomBigButton from "../../components/CustomBigButton";
import CustomSmallButton from "../../components/CustomSmallButton/CustomSmallButton";
import {useNavigation} from "@react-navigation/native";
import {useForm} from 'react-hook-form';

const email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const SignUpScreens = () => {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('');
    // const [passwordRepeat, setPasswordRepeat] = useState('');

    const {control, handleSubmit, watch} = useForm({defaultValues: {
        username: "",
        email: "",
        password: "",
        password_repeat: ""
    }});
    const password = watch('password');

    const navigation = useNavigation();
    const onSignInPress = () => {
        console.warn('oN');

        navigation.navigate("SignIn");
    };

    const onSignUpPress = (data) => {
        console.log(data);
        console.warn('oN');

        navigation.navigate("SignUp");
    };

    const {height} = useWindowDimensions();

    return (
        <View style={styles.root}>
            <Text>Monke Business</Text>
            {//<Image source={Banana} style={[styles.logo, {height: height * 0.3 }]} resizeMode={'contain'}/>}
            }
            <CustomInput
                name = 'username'
                placeholder = 'Username'
                control = {control}
                rules = {{
                    required: 'Username field must not be empty.',
                    minLength: {value:3, message: 'Username should be at least 3 characters long.'},
                    maxLength :{value:15, message: 'Username should not exceed 15 charaters.'}}}>
            </CustomInput>
            <CustomInput
                name = 'email'
                placeholder = 'Email'
                control = {control}
                rules = {{
                    required: 'Email field must not be empty.',
                    patter: {value: email_regex, message: 'Invalid mail address format.'}}}>
            </CustomInput>
            <CustomInput
                name = 'password'
                placeholder = 'Password'
                secureTextEntry
                control = {control}
                rules = {{
                    required: 'Password field must not be empty.',
                    minLength: {value:6, message: 'Password should be at least 6 characters long.'}}}>
            </CustomInput>
            <CustomInput
                name = 'password_repeat'
                placeholder = 'PasswordRepeat'
                secureTextEntry
                control = {control}
                rules = {{
                    required: 'Password field must not be empty.',
                    validate: value =>
                        value === password || 'Passwords do not match.'
                }}>
            </CustomInput>
            <CustomBigButton currentText={"Sign Up"} onPress={handleSubmit(onSignUpPress)}></CustomBigButton>
            <CustomSmallButton currentText={"Log in"} onPress={onSignInPress}></CustomSmallButton>
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

export default SignUpScreens;