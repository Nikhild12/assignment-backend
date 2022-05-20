const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const app = express();

mongoose.connect("mongodb+srv://admin:mnRvPX1kTjKVCztI@cluster0.h1rim.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    console.log("Connected to the database");
  }).catch((err)=>{
    console.log(err);
    console.log("Connection Failed!!");
  })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")));
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader('Access-Control-Allow-Methods',"GET,POST,PATCH,DELETE,PUT,OPTIONS");
  next();
})
// mongodb pwd:Gu2hJvxXYAoM0E2w
app.use("/api/user",userRoutes);

module.exports = app;
