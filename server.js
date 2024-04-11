const express = require("express");
const app = express();
const cors= require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();
const PORT= process.env.PORT || 5000;


app.use(bodyParser.json()); //for parsing in req.body
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('connected successfully')})
.catch((e)=>{console.log("err"); console.error(e.message)})
// const connection= mongoose.connection;
// connection.once('open',()=>{console.log("Database connection successfull")});

const postsRouter = require('./Routes/post.js');
app.use('/api/posts', postsRouter);

app.listen(PORT,()=>{console.log(`Server started successfully at ${PORT}`)});
