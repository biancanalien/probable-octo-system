import mongoose from 'mongoose';

const bankingAccountSchema = new mongoose.Schema({
    clientCode: { type: String, required: true },
    branchNumber: { type: String, required: true },
    branchNumberDigit: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    accountNumberDigit: { type: String, required: true },
    fullAccountNumber: { type: String, required: true },
    avaliableBalance: { type: Number, required: true }
});

mongoose.model('bankingAccount', bankingAccountSchema);
const bankingAccountModel = mongoose.model('bankingAccount');

export default bankingAccountModel;