import express from 'express';
import depositController from '../deposit/controller';
import withdrawController from '../withdraw/controller';
import bankingAccountController from '../account/controller';

const appMock = express();

appMock.use(express.json());

depositController(appMock);
withdrawController(appMock);
bankingAccountController(appMock);

export default appMock;