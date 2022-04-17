const app = require("express").Router();
const transactionModel = require("../model/Transactio");
const auth = require("../auth/auth");

app.get("/getAllTransaction", auth, async (req, res) => {
  try {
    if (req.header("token")) {
      const transaction = await transactionModel.find({ userID: req.id });
      res.status(200).json({ transaction });
    }else{
        res.status(201).json({message  :'Not Valid Token'})

    }
  } catch (error) {
    res.status(201).json({ error });
  }
});

module.exports = app;
