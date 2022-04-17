const app = require("express").Router();
const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken')


/*
/api/v1/login
method => post
*/

app.post('/login' , async (req,res)=>{
    try {
        const {email , password} = req.body
        const user = await userModel.findOne({email})
        if(user){
            const matches = await bcrypt.compare(password , user.password)
            if(matches){
                const token = jwt.sign({name : user.name , email : user.email , id : user._id} , 'abdomeid123')
                res.status(200).header({token}).json({message : 'logedin'})
            }else{
                res.status(201).json({ message: "Password In correct" });
            }
        }else{
            res.status(201).json({message : 'User Not Found'})
        }
    } catch (error) {
        res.status(201).json({message :"please Add Email And Password" })
    }
})






module.exports = app
