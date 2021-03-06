import depositService from './service';
import { baseURL } from '../../constant/route';

const depositController = app => {
    app.route(`${baseURL}/operation/deposit`).post(async (req, res) => {
        try {
            if (!await depositService.validateDeposit(req.body)) {
                return res.status(422).send('Failed to save deposit transaction. Request body with invalid values.');
            }
            const { bankingAccount } = res.locals.currentUser;
            const newDeposit = await depositService.save(req.body, bankingAccount);
            res.status(201).send(newDeposit);
        } catch (e) {
            console.error(`Failed to save data from deposit service: ${e.message}`);
            res.status(500).send('Failed when trying to save deposit');
        }
    });
};

export default depositController;