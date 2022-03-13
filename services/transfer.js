const Transaction = require("../model/Transaction");
const Accounts = require("../model/Account");


exports.transfer = async (sender, amount, beneficiary) => {
  let accountNumber
  const transaction = new Transaction();
  transaction.amount = -amount;
  transaction.operation = 'transfer';
  transaction.type = 'debit'
  transaction.sender = sender;
  transaction.beneficiary = beneficiary;
  transaction.reference = 'transfer_to_account:' + beneficiary;
  const savedTransaction = await transaction.save();
  const savedAccount = await Accounts.findOneAndUpdate(
    { accountNumber: sender },
    { $inc: { balance: -amount } },
    { new: true }
  );
  

  const transactionBeneficiary = new Transaction();
  transactionBeneficiary.amount = amount;
  transactionBeneficiary.operation = 'transfer';
  transaction.type = 'credit'
  transactionBeneficiary.beneficiary = beneficiary;
  transactionBeneficiary.reference = 'transfer_from_account:' + sender;
  const savedTransactionBeneficiary = await transactionBeneficiary.save();
   const savedAccountbeneficiary = await Accounts.findOneAndUpdate(
        { accountNumber: beneficiary },
        { $inc: { balance: amount } },
        { new: true }
      );

  const response = { transaction: savedTransaction, account: savedAccount }
  
  return response;
};