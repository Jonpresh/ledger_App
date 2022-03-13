const express = require('express');

const {
  transfer
} = require('../controller/transactions');

const router = express.Router();


router.post('/transfer', transfer);
 

module.exports = router;