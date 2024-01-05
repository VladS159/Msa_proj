const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["in the works", "done"],
        default:"in the works"
    },
    category:{
        type:String,
        required:true,
    },
    dueDate:{
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