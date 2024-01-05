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
        res.status(200).json({token});
    } catch(error){
        console.log("Login failed", error);
        res.status(500).json({message:"Login Failed"});
    }
});