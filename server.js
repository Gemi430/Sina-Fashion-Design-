const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019


const app = express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://localhost:27017')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successfull")
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    message:String

})

const users = mongoose.model("data",userSchema)

app.post('/post', async(req,res)=>{
   const {name,email,phone,message} = req.body
   const user = new users ({
     name,
     email,
     phone,
     message
   })
   await user.save()
   console.log(user)
   res.send("Form submission successful")
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.listen(port,()=>{
    console.log("The server started")
})