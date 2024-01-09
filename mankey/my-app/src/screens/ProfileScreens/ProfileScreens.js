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
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import { useIsFocused } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';
import Monkey from '../../../assets/images/monkey.png';
import Gorilla from '../../../assets/images/Gorilla.png';
import KingKong from '../../../assets/images/kingkong.png';
import Done from '../../../assets/images/done.png'

const HomeScreens = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [tasks, setTasks] = useState([])
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState();
    const [noOfBananas, setNoOfBananas] = useState();
    const [loading, setLoading] = useState(true);
    const {height} = useWindowDimensions();

    useEffect(() => {
        if(isFocused){
            getRemaingTasks();
            getCompletedTasks();
        }
    }, [isFocused]);

    const getRemaingTasks = async() => {
        try{
            const userId = await AsyncStorage.getItem('userId');
            
            const myUrl = "http://localhost:3000/users/" + userId + "/tasks";
            console.log("this is my url: "+myUrl);

            const response = await axios.get(myUrl);
            console.log(response.data.tasks);
            setTasks(response.data.tasks);

            const fetchedTasks = response.data.tasks || [];
            const inProgress = fetchedTasks.filter((task) => task.status !== "completed");

            setInProgressTasks(inProgress);

        } catch(error){
            console.log("avem o problema?..");
            console.log("error", error);
        }
    }

    const getCompletedTasks = async() => {
        try{
            const userId = await AsyncStorage.getItem('userId');
            
            const myUrl = "http://localhost:3000/users/" + userId;
            console.log("this is my url here: "+myUrl);

            const response = await axios.get(myUrl);

            const user = response.data;
            const userCompletedTasks = user.completedTasks || 0;
            const noOfBananas = user.noOfBananas;

            console.log(userCompletedTasks);
            console.log(noOfBananas);
            setCompletedTasks(userCompletedTasks);
            setNoOfBananas(noOfBananas);
            setLoading(false);

        } catch(error){
            console.log("avem o problema?..");
            console.log("error", error);
        }
    }

    const deleteCurrentInformation = async() => {
        try{
            const userId = await AsyncStorage.getItem('userId');
            
            const myUrl = "http://localhost:3000/users/" + userId + "/deleteCurrentInfo";
            console.log("this is my url here: "+myUrl);

            const response = await axios.patch(myUrl);
            navigation.navigate("Home");
            navigation.navigate("Profile");
        } catch(error){
            console.log("avem o problema?..");
            console.log("error", error);
        }
    }

    console.log("these are your remaining tasks "+inProgressTasks.length);
    console.log("these are your completed tasks "+completedTasks);

    const onLogOutPress = () => {
        AsyncStorage.removeItem('authToken');
        navigation.navigate("SignIn");
    };

    const pieChartData = [
        {
            name: 'Completed',
            population: parseInt(completedTasks, 10) || 0,
            color: 'green',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
        {
            name: 'Remaining',
            population: parseInt(inProgressTasks.length, 10) || 0,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
        },
    ];

    const returnMonkeyImage = () => {
        // Assuming you have kingkong image source
        return <Image source={Monkey} style={[styles.logo, { height: height * 0.3 }]} resizeMode={'contain'} />;
    };

    const returnGorillaImage = () => {
        // Assuming you have kingkong image source
        return <Image source={Gorilla} style={[styles.logo, { height: height * 0.3 }]} resizeMode={'contain'} />;
    };

    const returnKingKongImage = () => {
        // Assuming you have kingkong image source
        return <Image source={KingKong} style={[styles.logo, { height: height * 0.3 }]} resizeMode={'contain'} />;
    };
    
    const ChooseImage = (noOfBananas) => {

        if(loading){
            return null;
        }

        if (noOfBananas >= 0 && noOfBananas < 10) {
            return returnMonkeyImage();
        } else if (noOfBananas >= 10 && noOfBananas < 20) {
            return returnGorillaImage();
        } else {
            return returnKingKongImage();
        }
    };

    const isPieChartInvisible = inProgressTasks.length === 0 && completedTasks === 0;
    console.log(isPieChartInvisible);

return (
    <View style={styles.root}>
        <Text style={{fontFamily: 'DM Serif Display Regular'}}>My profile</Text>
        {ChooseImage(noOfBananas)}
        <Text>Remaining tasks: {inProgressTasks.length}</Text>
        <Text>Completed tasks: {completedTasks}</Text>
        {(!isPieChartInvisible) ? (
            <PieChart
            data={pieChartData}
            width={300}
            height={200}
            chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#08130D',
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
        />
        ) : (
            <Image source={Done} style={[styles.logo, { height: height * 0.3 }]} resizeMode={'contain'} />
        )}
        <CustomSmallButton currentText={"Delete current information"} onPress={deleteCurrentInformation}></CustomSmallButton>
        <View style={styles.buttonWrapper}>
            <CustomBigButton currentText={"Log out"} onPress={onLogOutPress}></CustomBigButton>
        </View>
        <CustomTabs></CustomTabs>
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
    buttonWrapper: {
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    root: {
        flex: 1,
        justifyContent: 'space-between',
        display: "flex",
        width: "100%",
        alignItems: 'center',
        alignContent: "center",
        // borderStyle: "solid",
        // borderColor: "red",
        // borderWidth: 4,
    },
}
)

export default HomeScreens;