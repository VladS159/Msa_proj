const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose.connect("mongodb+srv://vladmarius:mariusvlad@cluster0.xukfjs7.mongodb.net/").then(() => {
    console.log("Connected to mongoDb");
}).catch((error) => {
    console.log("Error connecting to mongoDb", error);
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
});

const User = require("./models/user");
const Task = require("./models/task");

app.post("/SignUp", async(req,res) => {
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            console.log("Email already in use.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // aici cred ca trebuie un else.
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        });

        await newUser.save();
        res.status(202).json({message:"New user registered."});

    } catch(error){
        console.log("Error registering the user", error);
        res.status(500).json({message:"Failed to register"});
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");

    return secretKey;
};

const secretKey = generateSecretKey();

app.post("/SignIn", async(req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email."});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            return res.status(401).json({message:"Invalid password."});
        }

        const token = jwt.sign({userId:user._id,}, secretKey);
        res.status(200).json({userId: user._id, token});
    } catch(error){
        console.log("Login failed", error);
        res.status(500).json({message:"Login Failed"});
    }
});

app.post("/tasks/:userId", async(req,res) =>{
    try{
        const userId = req.params.userId;
        const {addTask, noOfBananas, date} = req.body;

        const newTask = new Task({
            addTask,
            noOfBananas,
            date
        });

        //console.log("before saving new task");
        await newTask.save();
        //console.log("after saving new task");

        const user = await User.findById(userId);
        if(!user)
        {
            res.status(404).json({error:"User not found."});
        }
        user?.tasks.push(newTask._id);
        await user.save();

        res.status(200).json({message:"Task added successfully.",tasks:newTask});
    } catch{
        res.status(500).json({message:"New task not added."});
    }
});

app.get("/users/:userId/tasks", async(req,res) => {
    try{
        const userId = req.params.userId;

        //console.log("macar ajunge pana aici?..");

        const user = await User.findById(userId).populate("tasks");
        if(!user){
            return res.status(404).json({error:"User not found."});
        }

        //console.log("CE SE INTAMPLA DOCTORE..");
        res.status(200).json({tasks: user.tasks});
    } catch(error){
        //console.log("hmm... de ce nu merge?..");
        res.status(500).json({error:"Something went wrong."});
    }
});

app.patch("/users/:userId/removeTask/:taskId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const taskId = req.params.taskId;

        // Remove the task from the user's tasks array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { tasks: taskId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "Task removed from user's tasks." });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
});

app.patch("/users/:userId/addBananas/:taskId", async(req,res) => {
    const taskId = req.params.taskId;
    const userId = req.params.userId;

    const completedTask = await Task.findById(taskId);
    if (!completedTask) {
        return res.status(404).json({ error: "Task not found." });
    }

    console.log(completedTask);

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { noOfBananas: completedTask.noOfBananas,
                  completedTasks: 1 } },
        { new: true }
    );
    if (!updatedUser) {
        return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "Bananas added to the user." });
});

app.delete("/tasks/:taskId/delete", async(req,res) => {
    try{
        const taskId = req.params.taskId;
        const deletedTask = await Task.findByIdAndDelete(taskId)

        if(!deletedTask)
        {
            res.status(404).json({error:"Task not found."});
        }
        res.status(200).json({message:"Task completed."});
    } catch(error){
        res.status(500).json({error:"Something went wrong."});
    }
});

app.get("/users/:userId", async(req,res) => {
    try{
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if(!user)
        {
            res.status(404).json({error:"User not found."});
        }
        res.status(200).json(user);
    } catch(error){
        res.status(500).json({error:"Something went wrong."});
    }
});

app.patch("/users/:userId/deleteCurrentInfo", async (req, res) => {
    try {
        const userId = req.params.userId;

        // Remove the task from the user's tasks array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { completedTasks: 0 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({ message: "Completed tasks set to 0." });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong." });
    }
});