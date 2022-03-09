const express = require('express');

const {
  createAccount,
  getAccount,
  updateAccount,
} = require('../controller/account');

const router = express.Router();

//const { protect } = require('../middleware/auth');

router.post('/createAccount', createAccount);
 router.get('/getAccount', getAccount);
 router.put('/updateAccount/:id', updateAccount);

module.exports = router;
 