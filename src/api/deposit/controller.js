import depositService from './service';

const depositController = app => {
    app.route('/account/deposit').post(async (req, res) => {
        try {
            if (!await depositService.validateDeposit(req.body)) {
                return res.status(422).send('Failed to save deposit transaction. Request body with invalid values.');
            }

            const newDeposit = await depositService.save(req.body, res.locals.currentBankingAccount);
            res.status(201).send(newDeposit);
        } catch (e) {
            console.error(`Failed to save data from deposit service: ${e.message}`);
            res.status(500).send(`Failed when trying to save deposit`);
        }
    });
};

export default depositController;