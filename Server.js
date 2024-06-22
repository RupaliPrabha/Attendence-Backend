console.log("this  is my first Live project")
const express = require("express")
const app= express()
require("dotenv").config()
require('./config/db').connectDB()


//body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const router =require("./Router/UserRouter")
app.use("/attendance",router)


const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log("port is running on",PORT)
}) 