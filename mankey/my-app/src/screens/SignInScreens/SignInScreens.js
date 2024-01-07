import React, {useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput} from 'react-native'
import Banana from '../../../assets/images/Banana.jpg'
import CustomInput from "../../components/CustomInput";
import CustomBigButton from "../../components/CustomBigButton";
import CustomSmallButton from "../../components/CustomSmallButton/CustomSmallButton";
import {TabRouter, useNavigation} from "@react-navigation/native";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreens = () => {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        email: "",
        password: ""
    }});
    console.log(errors);

    useEffect(() => {
        const checkLoginStatus = async(userId) => {
            try{
                const token = await AsyncStorage.getItem("authToken");
                console.log("Retrieved token:", token);
                if(token){
                    navigation.replace("Home");
                    console.log("we are in.");
                }
            } catch(error) {
                console.log(error);
            }
        };
        checkLoginStatus();
    }, []);

    const onSignInPress = (data) => {
        //console.log(data);

        const user = {
            email:data.email,
            password:data.password
        }

        axios.post("http://192.168.1.3:3000/SignIn", user).then((response) => {
            const token = response.data.token;
            // const { userId, token } = response.data;
            
            console.log("Retrieved token: axis: ", token);
            // console.log('Retrieved id: authToken_${userId}');

            AsyncStorage.setItem("authToken", token);

            console.log("are we in?");
            navigation.replace("Home");
        });

        //navigation.navigate("SignIn");
    };

    const onSignUpPress = () => {
        //console.warn('oN');

        navigation.navigate("SignUp");
    };

    const {height} = useWindowDimensions();

    return (
        <View style={styles.root}>
            <Text>Monkei Business</Text>
            {//<Image source={Banana} style={[styles.logo, {height: height * 0.3 }]} resizeMode={'contain'}/>}
            }
            <View style={styles.inputWrapper}>
                <CustomInput
                    name = 'email'
                    placeholder = 'Email'
                    control = {control}
                    rules = {{
                        required: 'Email field must not be empty.'}}>
                </CustomInput>
                <CustomInput
                    name = "password"
                    placeholder = 'Password'
                    secureTextEntry
                    control = {control}
                    rules = {{required: 'Password field must not be empty.'}}>
                </CustomInput>
            </View>
            <View style={styles.buttonWrapper}>
                <CustomBigButton currentText={"Log in"} onPress={handleSubmit(onSignInPress)}></CustomBigButton>
                <CustomSmallButton currentText={"Sign Up"} onPress={onSignUpPress}></CustomSmallButton>
            </View>
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
            justifyContent: 'space-between',
            display: "flex",
            width: "100%",
            alignItems: 'center',
            // borderStyle: "solid",
            // borderColor: "red",
            // borderWidth: 4,
        },
        inputWrapper: {
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
        },
        buttonWrapper: {
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
        },
    }
)

export default SignInScreens;