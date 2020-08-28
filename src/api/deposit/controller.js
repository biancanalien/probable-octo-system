import depositService from './service';
import bankingAccountService from '../account/service';

const depositController = app => {
    app.route('/account/deposit').post(async ({ body }, res) => {
        try {
            if (!await depositService.validateDeposit(body)) {
                return res.status(422).send('Failed to save deposit transaction. Request body with invalid values.');
            }

            const currentBankingAccount = await bankingAccountService.getBankingAccount(body.fullAccountNumber);

            if (currentBankingAccount == null) {
                return res.status(404).send('Failed to find client. Banking account not found!');
            }

            const newDeposit = await depositService.save(body, currentBankingAccount);
            res.status(201).send(newDeposit);
        } catch (e) {
            console.error(`Failed to save data from deposit service: ${e.message}`);
            res.status(500).send(`Failed when trying to save deposit`);
        }
    });
};

export default depositController;