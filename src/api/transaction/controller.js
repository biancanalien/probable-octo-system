import bankingAccountService from '../account/service';
import transactionService from './service';
import { parseBankStatement } from './parse';

const transactionController = (app) => {
    app.route('/account/bank-statement').get(async ({ query }, res) => {
        try {
            const { fullAccountNumber, branchNumber, page } = query;

            const currentBankingAccount = await bankingAccountService.getBankingAccount(fullAccountNumber);

            if (currentBankingAccount == null) {
                return res.status(404).send('Failed to find client. Banking account not found!');
            }

            const result = await transactionService.getBankStatement(fullAccountNumber, branchNumber, parseInt(page));
            res.status(200).send(result.map(r => parseBankStatement(r)));
        } catch (e) {
            console.error(`Failed to retrieve data from bank statement service: ${e.message}`);
            res.status(500).send(`Failed when trying to retrieve data from bank statement service`);
        }
    });
}

export default transactionController;