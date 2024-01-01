import React, {useState} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native'
import Banana from '../../../assets/images/Banana.jpg'
import CustomInput from "../../components/CustomInput";
import CustomBigButton from "../../components/CustomBigButton";
import CustomSmallButton from "../../components/CustomSmallButton/CustomSmallButton";
import {useNavigation} from "@react-navigation/native";

const SignInScreens = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();
    const onSignInPress = () => {
        console.warn('oN');

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
            <CustomInput placeholder = 'Username' value={username} setValue={setUsername}></CustomInput>
            <CustomInput placeholder = 'Password' value={password} setValue={setPassword} secureTextEntry={true}></CustomInput>
            <CustomBigButton currentText={"Log in"} onPress={onSignInPress}></CustomBigButton>
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
            borderStyle: "solid",
            borderColor: "red",
            borderWidth: 4,
        },
    }
)

export default SignInScreens;