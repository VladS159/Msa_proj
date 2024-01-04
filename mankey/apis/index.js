const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");

const app = express();
const port = 3000;
const cors = require("cors");
app.unsubscribe(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://vladmarius:mariusvlad@cluster0.xukfjs7.mongodb.net/").then(() => {
    console.log("Connected to mongoDb");
}).catch((error) => {
    console.log("Error connecting to mongoDb", error);
});

app.listen(port, () => {
    console.log("Server is running on port 3000");
});