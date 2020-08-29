import transactionService from './service';
import { parseBankStatement } from './parse';
import { baseURL } from '../../constant/route';

const transactionController = (app) => {
    app.route(`${baseURL}/bank-statement`).get(async ({ query }, res) => {
        try {
            const { page } = query;
            const { bankingAccount } = res.locals.currentUser;
            const transactions = await transactionService.getBankStatement(bankingAccount.fullAccountNumber, bankingAccount.branchNumber, parseInt(page));
            res.status(200).send(parseBankStatement(transactions, bankingAccount));
        } catch (e) {
            console.error(`Failed to retrieve data from bank statement service: ${e.message}`);
            res.status(500).send('Failed when trying to retrieve data from bank statement service');
        }
    });
}

export default transactionController;