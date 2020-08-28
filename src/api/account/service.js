import clientService from '../client/service';
import { parseAccountBanking } from './parse';
import bankingAccountModel from './model';

const hideFields = { "_id": 0 };

const bankingAccountService = {
    validateBankingAccount() {
        return true;
    },
    async create(body) {
        const newClient = await clientService.create(body);

        const accountNumber = await generateAccountNumber();

        const newBankingAccount = {
            clientCode: newClient._id,
            branchNumber: "0001",
            branchNumberDigit: "0",
            accountNumber,
            accountNumberDigit: "0",
            fullAccountNumber: `${accountNumber}-0`,
            availableBalance: 0
        };

        const data = await bankingAccountModel.create(newBankingAccount);
        return parseAccountBanking(newClient, data);
    },
    async updateAvailableBalance(transaction, bankingAccount) {
        if (transaction.actionType === 'A') {
            bankingAccount.availableBalance += transaction.value;
        } else if (transaction.actionType === 'D') {
            bankingAccount.availableBalance -= transaction.value;
        }

        return await bankingAccountModel
            .findOneAndUpdate({ 'fullAccountNumber': bankingAccount.fullAccountNumber }, bankingAccount, { new: true, upsert: true, fields: hideFields })
    },
    async getBankingAccount(fullAccountNumber) {
        return await bankingAccountModel.findOne({ fullAccountNumber }) || null;
    }
}

const generateAccountNumber = async () => {
    let newAccountNumber = null;

    do {
        newAccountNumber = Math.floor(100000 + Math.random() * 900000);
    } while (await accountExist(newAccountNumber));

    return newAccountNumber;
}

const accountExist = async (accountNumber) => {
    const account = await bankingAccountModel.findOne({ accountNumber });
    return account != null;
}

export default bankingAccountService;