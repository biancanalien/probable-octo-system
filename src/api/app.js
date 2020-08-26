import express from 'express';
import db from '../settings/db';
import depositController from './deposit/controller';
import withdrawController from './withdraw/controller';
import bankingAccountController from './account/controller';

db.connect();

const app = express();

app.use(express.json());

depositController(app);
withdrawController(app);
bankingAccountController(app);

export default app;