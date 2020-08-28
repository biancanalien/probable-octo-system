import withdrawService from './service';
import { baseURL } from '../../constant/route';

const withdrawController = app => {
    app.route(`${baseURL}/operation/withdraw`).post(async ({ body }, res) => {
        try {
            if (!await withdrawService.validate(body)) {
                return res.status(422).send('Failed to save withdraw transaction. Request body with invalid values.');
            }

            const { currentBankingAccount } = res.locals;

            if (body.value > currentBankingAccount.availableBalance) {
                return res.status(422).send('Failed to withdraw this value. Not enough balance available!');
            }

            const newWithdraw = await withdrawService.save(body, currentBankingAccount);
            res.status(201).send(newWithdraw);
        } catch (e) {
            console.error(`Failed to save data from withdraw service: ${e.message}`);
            res.status(500).send(`Failed when trying to save withdraw`);
        }
    });
}

export default withdrawController;