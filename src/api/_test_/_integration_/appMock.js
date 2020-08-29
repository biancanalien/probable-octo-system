import express from 'express';
import { checkBankingAccount } from '../../../middleware/auth';

import depositController from '../../deposit/controller';
import withdrawController from '../../withdraw/controller';
import bankingAccountController from '../../account/controller';
import transactionController from '../../transaction/controller';

const appMock = express();

appMock.use(express.json());

appMock.use(checkBankingAccount);

depositController(appMock);
withdrawController(appMock);
bankingAccountController(appMock);
transactionController(appMock);

export default appMock;