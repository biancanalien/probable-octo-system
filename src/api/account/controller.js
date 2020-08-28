import bankingAccountService from './service';
import { baseURL } from '../../constant/route';

const bankingAccountController = app => {
    app.route(`${baseURL}/account/new`).post(async ({ body }, res) => {
        try {
            if (!bankingAccountService.validateBankingAccount(body)) {
                return res.status(422).send('Failed to create banking account. Request body with invalid values.');
            }

            const newBankingAccount = await bankingAccountService.create(body);
            res.status(201).send(newBankingAccount);
        } catch (e) {
            console.error(`Failed to create data from banking account service ${e.message}`);
            res.status(500).send(`Failed when trying to create client banking account`);
        }
    });

    app.route(`${baseURL}/account/me`).get(async (_, res) => {
        try {
            res.status(200).send(res.locals.currentBankingAccount);
        } catch (e) {
            console.error(`Failed to create data from banking account service ${e.message}`);
            res.status(500).send(`Failed when trying to create client banking account`);
        }
    });
};

export default bankingAccountController;