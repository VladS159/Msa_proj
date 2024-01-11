import React, {useState, useEffect} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import CustomTask from "../../components/CustomTask";
import { useIsFocused } from '@react-navigation/native';
import CustomTitle from "../../components/CustomTitle";

const HomeScreens = () => {

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
            
            const myUrl = "http://192.168.0.101:3000/users/" + userId + "/tasks";
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

    const markTaskAsCompleted = async (taskId, flag) => {
        try{
            console.log(flag);

            const userId = await AsyncStorage.getItem('userId');
            //setMarked(true);
            const myUrl = "http://192.168.0.101:3000/tasks/" + taskId + "/delete";
            const myUrl2 = "http://192.168.0.101:3000/users/" + userId + "/removeTask/" + taskId;

            console.log("this is my url: "+myUrl);
            console.log("this is my url2: "+myUrl2);

            if(flag){
                const myUrl3 = "http://192.168.0.101:3000/users/" + userId + "/addBananas/" + taskId;
                console.log("this is my url2: "+myUrl3);

                const bananaResponse = await axios.patch(myUrl3);
                console.log(bananaResponse.data);
            }
            const response = await axios.delete(myUrl)
            console.log(response.data);
            const userResponse = await axios.patch(myUrl2);
            console.log(userResponse.data);
            getUserTasks();
        } catch(error){
            console.log("error",error);
        }
    }

    console.log("completed", completedTasks);
    console.log("inProgress", inProgressTasks);

    return (
        <View style={styles.root}>
            <CustomTitle titleText="Home"></CustomTitle>
            <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scroll}>
            {inProgressTasks.map((task) => (
                <CustomTask key={task._id} taskName={task.addTask} taskDate={task.date} controlButtons={true} onComplete={() => {
                    markTaskAsCompleted(task._id, true)}} onDelete={() => {markTaskAsCompleted(task._id, false)}}></CustomTask>
            ))}
            </ScrollView>
            <CustomTabs currentFocusedTab="0"></CustomTabs>
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
    scroll: {
        maxHeight: "75%",
        width: "100%",
    },
    contentContainer: {
        display: "flex",
        alignItems: 'center',
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