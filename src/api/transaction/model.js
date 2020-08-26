import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    transactionType: { type: String, required: true, enum: ['WD', 'DP', 'PY'] },
    value: { type: Number, required: true },
    actionType: { type: String, required: true, enum: ['A', 'D'] },
    labelDescription: { type: String, required: true },
    branchNumber: { type: String, required: true },
    fullAccountNumber: { type: String, required: true },
    operation: { type: Object, required: true }
});

mongoose.model('transaction', transactionSchema);
const transactionModel = mongoose.model('transaction');

export default transactionModel;