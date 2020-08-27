import bankingAccountService from '../account/service';
import withdrawService from './service';

const withdrawController = app => {
    app.route('/account/withdraw').post(async ({ body }, res) => {
        try {
            if (!await withdrawService.validate(body)) {
                return res.status(422).send('Failed to save withdraw transaction. Request body with invalid values.');
            }

            const currentBankingAccount = await bankingAccountService.getBankingAccount(body.fullAccountNumber);

            if (currentBankingAccount == null) {
                return res.status(404).send('Failed to find client. Banking account not found!');
            }

            if (body.value > currentBankingAccount.availableBalance) {
                return res.status(422).send('Failed to withdraw this value. Not enough balance available!');
            }

            const newWithdraw = await withdrawService.save(body);

            if (newWithdraw == null) {
                return res.status(500).send('Failed when trying to save withdraw');
            }

            res.status(201).send(newWithdraw);
        } catch (e) {
            console.error(`Failed to save data from withdraw service: ${e.message}`);
            res.status(500).send(`Failed when trying to save withdraw`);
        }
    });
}

export default withdrawController;