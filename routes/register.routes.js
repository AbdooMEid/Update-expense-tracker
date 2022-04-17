const app = require("express").Router();
const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const { check, validationResult } = require("express-validator");

app.post(
  "/register",
  check("name").isAlpha("en-US"),
  check("email").isEmail(),
  check("password").matches(/^(?=.*[A-Z]).{8,}$/),
  check("confirmPassword").matches(/^(?=.*[A-Z]).{8,}$/),
  async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      const error = validationResult(req);
      if(!error.isEmpty()){
          return res.status(201).json(error.array())
      }else{
          const user = await userModel.findOne({email: email})
          if(user == null){
              if(password === confirmPassword){
                  bcrypt.hash(password , 10 , async (err , hash)=>{
                    const users = await userModel.insertMany({name , email , password : hash})
                    res.status(200).json({users})
                  })
              }else{
                return  res.status(201).json({message : 'password don not matche confirm Password'})
              }
          }else{
           return res.status(201).json({message : 'email is already exists'})
          }
      }
    } catch (error) {
        res.status(201).json(error)
    }
  }
);

module.exports = app;
