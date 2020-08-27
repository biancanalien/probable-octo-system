import express from 'express';
import depositController from '../deposit/controller';
import withdrawController from '../withdraw/controller';
import bankingAccountController from '../account/controller';
import transactionController from '../transaction/controller';

const appMock = express();

appMock.use(express.json());

depositController(appMock);
withdrawController(appMock);
bankingAccountController(appMock);
transactionController(appMock);

export default appMock;