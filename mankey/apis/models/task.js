const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    addTask:{
        type:String,
        required:true,
    },
    noOfBananas:{
        type:String,
        required:true,
    },
    // category:{
    //     type:String,
    //     required:true,
    // },
    status:{
        type:String,
        enum:["inProgress","completed"],
        default:"inProgress"
    },
    date:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;