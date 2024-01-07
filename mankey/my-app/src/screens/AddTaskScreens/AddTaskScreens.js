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
    
return (
    <View style={styles.root}>
        <Text>Adding Task</Text>
        <TextInput
            //onChangeText={onChange}
            //onBlur={onBlur}
            placeholder="Name your task"
            style={styles.input}
        ></TextInput>
        <TextInput
            //onChangeText={onChange}
            //onBlur={onBlur}
            placeholder="How Many Bananas?"
            style={styles.input}
        ></TextInput>
        <View>
        <DateTimePicker
            value={value}
            onValueChange={(date) => setValue(date)}
            headerContainerStyle={{backgroundColor: "#9EB384"}}
            headerTextContainerStyle={{backgroundColor: '#9EB384'}}
            headerButtonStyle={{backgroundColor: '#9EB384'}}
            dayContainerStyle={{backgroundColor: '#9EB384'}}
            todayContainerStyle={{backgroundColor: '#9EB384'}}
            monthContainerStyle={{backgroundColor: '#9EB384'}}


        />
        </View>

        <CustomBigButton currentText={"Add Task"} onPress={() => console.log("Da?Da.")}></CustomBigButton>

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