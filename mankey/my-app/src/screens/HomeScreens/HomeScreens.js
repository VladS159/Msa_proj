import React, {useState, useEffect} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, ScrollView, Pressable} from 'react-native'
import Banana from '../../../assets/images/Banana.jpg'
import CustomInput from "../../components/CustomInput";
import CustomBigButton from "../../components/CustomBigButton";
import CustomSmallButton from "../../components/CustomSmallButton/CustomSmallButton";
import {TabRouter, useNavigation} from "@react-navigation/native";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import CustomTask from "../../components/CustomTask";
import { useIsFocused } from '@react-navigation/native';

const HomeScreens = () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [tasks, setTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [marked, setMarked] = useState(false);
    
    useEffect(() => {
        if(isFocused){
            getUserTasks();
        }
    }, [isFocused]);
    
    const getUserTasks = async() => {
        try{
            const userId = await AsyncStorage.getItem('userId');
            
            const myUrl = "http://localhost:3000/users/" + userId + "/tasks";
            console.log("this is my url: "+myUrl);
            
            //console.log("log1");

            const response = await axios.get(myUrl);
            //console.log("log2");
            console.log(response.data.tasks);
            setTasks(response.data.tasks);

            //console.log("log3");

            const fetchedTasks = response.data.tasks || [];
            const inProgress = fetchedTasks.filter((task) => task.status !== "completed");
            const completed = fetchedTasks.filter((task) => task.status === "completed");

            //console.log("before printing the lists.");

            setInProgressTasks(inProgress);
            setCompletedTasks(completed);

        } catch(error){
            console.log("avem o problema?..");
            console.log("error", error);
        }
    }

    const markTaskAsCompleted = async (taskId) => {
        try{
            setMarked(true);

            const myUrl = "http://localhost:3000/tasks/" + taskId + "/complete";
            console.log("this is my url: "+myUrl);

            const response = await axios.patch(myUrl)
            console.log(response.data);
            getUserTasks();
        } catch(error){
            console.log("error",error);
        }
    }

    console.log("completed", completedTasks);
    console.log("inProgress", inProgressTasks);

    return (
        <View style={styles.root}>
            <Text>Home sweet home</Text>
            {inProgressTasks.map((task) => (
                <CustomTask key={task._id} taskName={task.addTask} taskDate={task.date} onComplete={() => {
                    markTaskAsCompleted(task._id)}} onDelete={markTaskAsCompleted}></CustomTask>
            ))}
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