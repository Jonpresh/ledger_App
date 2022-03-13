const Transaction = require("../model/Transaction");
const Accounts = require("../model/Account");
const transferService = require('../services/transfer');



exports.transfer = async (req, res, next) => {
 const {sender, amount, beneficiary} = req.body
    try {    
      const transaction = await transferService.transfer(sender, amount, beneficiary);    
       res.status(200).json({
        success: true,
        data: transaction
      });
    } catch (error) {
      next(error);
    }
  };

  