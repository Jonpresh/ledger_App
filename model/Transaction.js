const mongoose = require('mongoose');
const Account = require('../model/Account');


/**
* Indicates type of operation
*/
const operations = ['deposit', 'withdrawal', 'transfer'];

/**
 * Transaction Schema
 * @private
 */
const transactionSchema = new mongoose.Schema({
  operation: {
    type: String,
    required: true,
    enum: operations,
  },
  description: {
    type: String,    
  },
 type: {
    type: String,
    enum: ['credit', 'debit'],
  },
  sender: {
    type: String,
    ref: 'Account',
    
  },
  beneficiary: {
    type:String,
    ref: 'Account'
  },
  amount: {
    type: Number,
    default: 0,
    
  },
  reference: {
    type: String,
  },
}, {
  timestamps: true,
});


module.exports = mongoose.model('Transaction', transactionSchema);
  
