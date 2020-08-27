import bankingAccountService from '../account/service';
import transactionModel from './model';
import { parseTransaction } from './parse';
import { currentDate } from '../../helpers/dateHelper';

const transactionService = {
    async create(newTransaction) {
        newTransaction.date = currentDate();
        const transaction = await transactionModel.create(newTransaction);
        const bankingAccount = await bankingAccountService.updateAvailableBalance(transaction);

        if (bankingAccount == null) {
            await transactionModel.findByIdAndDelete(transaction._id);
            return null;
        }

        return parseTransaction(transaction, bankingAccount);
    },
    getBankStatement(fullAccountNumber, branchNumber, page = 1) {
        const pageSize = 20;
        const skip = (page - 1) * pageSize;
        return transactionModel
            .find({ fullAccountNumber: fullAccountNumber, branchNumber: branchNumber })
            .sort({ _id: -1 })
            .skip(skip)
            .limit(pageSize);
    }
}

export default transactionService;