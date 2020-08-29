import clientService from '../client/service';
import bankingAccountModel from './model';
import { stringIsNullOrEmpty } from '../../helpers/stringHelper';

const hideFields = { "_id": 0 };

const bankingAccountService = {
    validateBankingAccount({ fullName = null, email = null, document = null }) {
        return fullName != null &&
            !stringIsNullOrEmpty(fullName) &&
            email != null &&
            !stringIsNullOrEmpty(email) &&
            document != null &&
            !stringIsNullOrEmpty(document);
    },
    async create(body) {
        const client = await clientService.create(body);

        const accountNumber = await generateAccountNumber();

        const newBankingAccount = {
            clientCode: client._id,
            branchNumber: "0001",
            branchNumberDigit: "0",
            accountNumber,
            accountNumberDigit: "0",
            fullAccountNumber: `${accountNumber}-0`,
            availableBalance: 0
        };

        const bankingAccount = await bankingAccountModel.create(newBankingAccount);
        return { client, bankingAccount };
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
        const bankingAccount = await bankingAccountModel.findOne({ fullAccountNumber }) || null;
        if (!bankingAccount) return null;
        const client = await clientService.getClientById(bankingAccount.clientCode);
        return { client, bankingAccount };
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