import express from 'express';
import unless from 'express-unless';
import { checkBankingAccount } from '../../../../middleware/auth';

import depositController from '../../../deposit/controller';
import withdrawController from '../../../withdraw/controller';
import bankingAccountController from '../../../account/controller';
import transactionController from '../../../transaction/controller';

const appMock = express();

appMock.use(express.json());

checkBankingAccount.unless = unless;
appMock.use(checkBankingAccount.unless({ path: ['/api/v1/account/new'], method: 'OPTIONS' }));

depositController(appMock);
withdrawController(appMock);
bankingAccountController(appMock);
transactionController(appMock);

export default appMock;