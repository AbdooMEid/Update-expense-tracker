const app = require("express").Router();
const transactionModel = require("../model/Transactio");





 app.delete('/deleteTransaction' ,async (req,res)=>{
    try {
        const transaction = await transactionModel.findByIdAndDelete({_id : req.body.delete})
 
        if(!transaction){
            res.status(201).json({
                success: false, 
                error : 'Not Transaction Found'
            })
        } 
        return res.status(200).json({message : 'deleted successfully' })
    } catch (err) {
     return res.status(201).json({
         success : false,
         error : 'server error'
     })
    }
 })


 module.exports = app
 
