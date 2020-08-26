import bankingAccountService from '../account/service';
import transactionModel from './model';
import { parseTransaction } from './parse';
import { currentDate } from '../../helpers/dateHelper';

const transactionService = {
    async create(newTransaction) {
        newTransaction.date = currentDate();
        const transaction = await transactionModel.create(newTransaction);
        const bankingAccount = await bankingAccountService.updateAvaliableBalance(transaction);

        if (bankingAccount == null) {
            await transactionModel.findByIdAndDelete(transaction._id);
            return null;
        }

        return parseTransaction(transaction, bankingAccount);
    }
}

export default transactionService;