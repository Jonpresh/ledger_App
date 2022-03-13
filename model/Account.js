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
    
  })

  module.exports = mongoose.model('Account', accountSchema);
