const express = require('express')
require("dotenv").config()

const userRouter = require("./apis/users/usersrouters")

var app= express();
app.use(express.json());

app.use('/image',express.static('uploads/image'))

app.use("/api/users", userRouter);


app.listen(process.env.APP_PORT, () =>{
    console.log("server is in running",process.env.APP_PORT);
})