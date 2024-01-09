import React, {useState, useEffect, useRef} from 'react'
import {View, Text, Image, StyleSheet, useWindowDimensions, TextInput, ScrollView} from 'react-native'
import {TabRouter, useIsFocused, useNavigation} from "@react-navigation/native";
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTabs from "../../components/CustomTabs/CustomTabs";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import CustomTask from "../../components/CustomTask";

const CalendarScreens = () => {

    const isFocused = useIsFocused();
    const [tasks, setTasks] = useState([]);
    const [inProgressTasks, setInProgressTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [marked, setMarked] = useState(false);
    const [value, setValue] = useState(dayjs());
    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        addTask: "",
        noOfBananas: "",
        date: "",
    }});

    useEffect(() => {
        if(isFocused){
            getUserTasks(dayjs(Date()).format("YYYY-MM-DD"));
        }
    }, [isFocused]);

    const getUserTasks = async(formattedDate) => {
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
            const inProgressFiltered = inProgress.filter((task) => task.date === formattedDate);

            //console.log("before printing the lists.");

            setInProgressTasks(inProgressFiltered);
            console.log(dayjs(Date()).format("YYYY-MM-DD"));
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
        <Text>Calendar</Text>
        <Controller
            control = {control}
            name = "date"
            render = {({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                <>
                    <View style={styles.container}>
                        <DateTimePicker
                            value={value}
                            onValueChange={(date) => {
                                const formattedDate = dayjs(date).format("YYYY-MM-DD");
                                setValue(formattedDate);
                                onChange(formattedDate);
                                getUserTasks(formattedDate);}}
                            headerContainerStyle={{backgroundColor: "#9EB384"}}
                            headerTextContainerStyle={{backgroundColor: '#9EB384'}}
                            headerButtonStyle={{backgroundColor: '#9EB384'}}
                            dayContainerStyle={{backgroundColor: '#9EB384'}}
                            todayContainerStyle={{backgroundColor: '#9EB384'}}
                            monthContainerStyle={{backgroundColor: '#9EB384'}}
                            selectedItemColor='#435334'
                            mode='date'
                        />
                    </View>
                    {error && (
                        <Text style = {{color: 'red', alignSelf: 'center'}}>{error.message || 'Error'}</Text>
                    )} 
                </>
            )}
        >
        </Controller>

        <Text>The Day's Tasks:</Text>

        <ScrollView style={styles.scroll}>
            {inProgressTasks.map((task) => (
                <CustomTask key={task._id} taskName={task.addTask} taskDate={task.date} onComplete={() => {
                    markTaskAsCompleted(task._id)}} onDelete={markTaskAsCompleted}></CustomTask>
            ))}
        </ScrollView>

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
    scroll: {
        maxHeight: "75%",
        width: "100%",
        marginBottom: 10,
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
    input: {
        width: "50%",
        alignItems: 'center',
        padding: 20,
        borderColor: '#9EB384',
        borderBottomWidth: 1,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        backgroundColor: '#9EB384',
        textAlign: 'center',
        borderRadius: 10,
    },
}
)

export default CalendarScreens;