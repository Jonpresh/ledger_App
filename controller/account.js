const Account = require('../model/Account')



// @desc      Create Account
// @route     POST /auth/create
// @access    Public
exports.createAccount = async (req, res, next) => {
  const {accountName, accountNumber, accountStatus, balance, role  } = req.body;

  // Create account
  const account = await Account.create({
    accountName,
    accountNumber,
    accountStatus,
    balance,
    role 
  });

  res.status(200).json({
    success: true,
    data: account.refresh()
  });

};


// @desc      Get Account
// @route     POST /account/getAccount
// @access    Public
exports.getAccount = async (req, res, next) => {
  const account = await Account.find();

  res.status(200).json({
    success: true,
    data: account
  });
}


   


// @desc      Update Account
// @route     PUT /account/updateAccount
// @access    Private
exports.updateAccount = async (req, res, next) => {
  const { accountName, accountNumber, accountStatus, balance, role } = req.body;

  const {id} = req.params

   const fieldsToUpdate = {
    accountName,
    accountNumber,
    accountStatus,
    balance,
    role 
  };

  const account = await Account.findByIdAndUpdate({_id: id },  fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: account.refresh()
  });
};

