const Transaction = require('../model/Transactio');

//@desc     Get all transactions
// @route   Get  /api/v1/transaction
// @ access public        

exports.getTransactions = async (req,res,next)=>{
   try {
       const transaction = await Transaction.find()

       return res.status(200).json({
           success : true,
           count : transaction.length,
           dataList : transaction
       })
   } catch (err) {
       return res.status(500).json({
           success : false,
           error : 'server Error',
       })
   }
};




//@desc      Add transaction
// @route   Post /api/v1/transaction
// @ access public        

exports.addTransaction = async (req,res,next)=>{
   try {
    const {text , amount} = req.body;

    const transaction = await Transaction.create(req.body);

    return res.status(201).json({
        success : true,
        data : transaction
    })
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

}





//@desc     delete transaction
// @route   Get  /api/v1/transaction
// @ access public        

exports.deleteTransaction = async (req,res,next)=>{
   try {
       const transaction = await Transaction.findById(req.params.id)

       if(!transaction){
           res.status(404).json({
               success: false, 
               error : 'Not Transaction Found'
           })
       }

       await transaction.remove()

       return res.status(200).json({
           success : true,
           data : {}
       })
   } catch (err) {
    return res.status(500).json({
        success : false,
        error : 'server error'
    })
   }
}
