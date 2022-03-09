const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const roles = ['customer', 'admin'];

const accountSchema = new mongoose.Schema({
    accountName: {
      type: String,
      trim: true,
       required: [true, 'Please Enter an Account Name'],
      maxlength: 100
    },
    accountNumber: {
      type: Number,
      required: [true, 'Please Enter an Account Number'],
      
      
    },
    balance: {
      type: Number,
      min: 0,
      default: 0
  },
    role: {
        type: String,
        enum: roles,
        default: 'customer',
      },
      accountStatus: {
        type: String,
        enum: ['Active', 'Inactive']
      },
    createdAt: {
      type: Date,
      default: Date.now
    }
    
  });



accountSchema.methods.refresh = function() {
  
  const refreshed = {};
  const fields = ['id', 'accountName', 'accountNumber', 'accountStatus','role', 'createdAt'];

  fields.forEach((field) => {
    refreshed[field] = this[field];
  });

  return refreshed;
  
};

accountSchema.methods.refreshBalance = function() {
  
  const refreshed = {};
      const fields = ['id', 'accountName', 'accountNumber','role', 'accountStatus','balance', 'createdAt'];
  
      fields.forEach((field) => {
        refreshed[field] = this[field];
      });
  
      return refreshed;
};



/**
 * Statics
 */
  accountSchema.statics = {
//   /**
//    * Get account
//    *
//    * @param {ObjectId} id - The objectId of account.
//    * @returns {Promise<Customer, APIError>}
//    */
  async get(id) {
    try {
      let account;

      if (mongoose.Types.ObjectId.isValid(id)) {
        account = await this.findById(id).exec();
      }
      if (account) {
        return account;
      }

      throw new APIError({
        message: 'Account does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },

  async debit(accountNumber, amount){
    return await this.findOne({accountNumber}, {$inc:{balance: -amount}}, {new: true})
  },


  async credit(accountNumber, amount){
    return await this.findOne({accountNumber}, {$inc:{balance: amount}}, {new: true})
  },

  

 }



  module.exports = mongoose.model('Account', accountSchema);
