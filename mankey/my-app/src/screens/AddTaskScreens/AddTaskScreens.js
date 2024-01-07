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
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

const AddTaskScreens = () => {

    const navigation = useNavigation();
    const [value, setValue] = useState(dayjs());
    const {control, handleSubmit, formState: {errors}} = useForm({defaultValues: {
        addTask: "",
        noOfBananas: "",
        date: "",
    }});
    
    const addTask = async (data, userId) => {
        try{
            const task = {
                addTask: data.addTask,
                noOfBananas: data.noOfBananas,
                date: data.date
            }

            //console.log("am ajuns aici...");
            console.log(task);
            //console.log("am ajuns aici...");

        const userId = await AsyncStorage.getItem("userId");
        console.log(userId);
        const myUrl = "http://192.168.1.3:3000/tasks/"+userId;  

        axios.post(myUrl, task).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log("error1", error);
        });

        navigation.navigate("Home");
        } catch(error){
            console.log("error2", error);
        }
    }

return (
    <View style={styles.root}>
        <Text>Adding Task</Text>
        <CustomInput
            //onChangeText={onChange}
            //onBlur={onBlur}
            name = "addTask"
            placeholder="Name your task"
            control = {control}
            style={styles.input}
            rules = {{
                required: 'Task name must not be empty.'}}>
        </CustomInput>
        <CustomInput
            //onChangeText={onChange}
            //onBlur={onBlur}
            name = "noOfBananas"
            placeholder="How Many Bananas?"
            control = {control}
            style={styles.input}
            rules = {{
                required: 'Task name must not be empty.',
                pattern: {
                    value: /^(?:[1-9]|10)$/,
                    message: 'Please enter a positive number less than or equal to 10.',
                }}}>
        </CustomInput>
        {/* <View>
        <DateTimePicker
            value={value}
            onValueChange={(date) => {
                setValue(date);
                console.log(date);}}
            headerContainerStyle={{backgroundColor: "#9EB384"}}
            headerTextContainerStyle={{backgroundColor: '#9EB384'}}
            headerButtonStyle={{backgroundColor: '#9EB384'}}
            dayContainerStyle={{backgroundColor: '#9EB384'}}
            todayContainerStyle={{backgroundColor: '#9EB384'}}
            monthContainerStyle={{backgroundColor: '#9EB384'}}

        />
        </View> */}

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
                                onChange(formattedDate);}}
                            headerContainerStyle={{backgroundColor: "#9EB384"}}
                            headerTextContainerStyle={{backgroundColor: '#9EB384'}}
                            headerButtonStyle={{backgroundColor: '#9EB384'}}
                            dayContainerStyle={{backgroundColor: '#9EB384'}}
                            todayContainerStyle={{backgroundColor: '#9EB384'}}
                            monthContainerStyle={{backgroundColor: '#9EB384'}}
                        />
                    </View>
                    {error && (
                        <Text style = {{color: 'red', alignSelf: 'center'}}>{error.message || 'Error'}</Text>
                    )} 
                </>
            )}
        >
        </Controller>

        <CustomBigButton currentText={"Add Task"} onPress={handleSubmit(addTask)}></CustomBigButton>

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

export default AddTaskScreens;