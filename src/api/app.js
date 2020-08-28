import express from 'express';
import db from '../settings/db';
import { checkBankingAccount } from '../middleware/auth';

import depositController from './deposit/controller';
import withdrawController from './withdraw/controller';
import bankingAccountController from './account/controller';
import transactionController from './transaction/controller';

db.connect();

const app = express();

app.use(express.json());

app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});

app.use(checkBankingAccount);

depositController(app);
withdrawController(app);
bankingAccountController(app);
transactionController(app);

export default app;