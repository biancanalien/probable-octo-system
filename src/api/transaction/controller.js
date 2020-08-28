import transactionService from './service';
import { parseBankStatement } from './parse';

const transactionController = (app) => {
    app.route('/account/bank-statement').get(async ({ query }, res) => {
        try {
            const { page } = query;
            const { currentBankingAccount } = res.locals;
            const transactions = await transactionService.getBankStatement(currentBankingAccount.fullAccountNumber, currentBankingAccount.branchNumber, parseInt(page));
            res.status(200).send(parseBankStatement(transactions, currentBankingAccount));
        } catch (e) {
            console.error(`Failed to retrieve data from bank statement service: ${e.message}`);
            res.status(500).send(`Failed when trying to retrieve data from bank statement service`);
        }
    });
}

export default transactionController;