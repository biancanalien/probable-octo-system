import withdrawService from './service';
import { baseURL } from '../../constant/route';

const withdrawController = app => {
    app.route(`${baseURL}/operation/withdraw`).post(async ({ body }, res) => {
        try {
            if (!await withdrawService.validate(body)) {
                return res.status(422).send('Failed to save withdraw transaction. Request body with invalid values.');
            }

            const { bankingAccount } = res.locals.currentUser;

            if (body.value > bankingAccount.availableBalance) {
                return res.status(422).send('Failed to withdraw this value. Not enough balance available!');
            }

            const newWithdraw = await withdrawService.save(body, bankingAccount);
            res.status(201).send(newWithdraw);
        } catch (e) {
            console.error(`Failed to save data from withdraw service: ${e.message}`);
            res.status(500).send('Failed when trying to save withdraw');
        }
    });
}

export default withdrawController;