import bankingAccountService from './service';

const bankingAccountController = app => {
    app.route('/account/client').post(async ({ body }, res) => {
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
};

export default bankingAccountController;