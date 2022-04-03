const app = require('express').Router()
const transactionModel = require('../model/Transactio')
const auth = require('../auth/auth')



app.post('/addTransaction' , auth ,async (req,res,next)=>{
    try {
     const {text , amount} = req.body;
        if(req.header('token')){
            const transaction = await transactionModel.insertMany({text , amount , userID : req.id})
            return res.status(201).json({transaction})
        }else{
            res.status(201).json({message  :'Not Valid Token'})
        }
   
     
    } catch (err) {
        if(err.name === 'ValidationError'){
         const message = Object.values(err.errors).map(val => val.message);
         return res.status(400).json({
             success : false , 
             error : message
         })
        }else{
            return res.status(500).json({
                success : false,
                error : 'server error'
            })
        }
    }
 
 })  

module.exports = app