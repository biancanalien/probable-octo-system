import { createAndSaveMockDeposit, createAndSaveMockAccount } from './dataMock';
import appMock from './appMock';
import dbMock from './dbMock';
import request from 'supertest';

const currentDate = Date.now();

describe('test get bank statement service', () => {
    let bankingAccount = null;

    beforeAll(async () => {
        await dbMock.connect();
        global.Date.now = jest.fn(() => new Date('2020-08-26T14:37:22.418Z').getTime())
    });

    beforeEach(async () => {
        bankingAccount = await createAndSaveMockAccount();
    });

    afterAll(async () => {
        await dbMock.disconnect();
        global.Date.now = currentDate;
    });

    afterEach(async () => {
        await dbMock.clearDatabase();
    });

    it('return list of transactions with 200 status', async (done) => {
        await createAndSaveMockDeposit(bankingAccount);
        await createAndSaveMockDeposit(bankingAccount);
        await createAndSaveMockDeposit(bankingAccount);

        const expected = [{ "transactionType": "DP", "value": 521.36, "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "branchNumber": "0001", "fullAccountNumber": bankingAccount.fullAccountNumber, "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }, { "transactionType": "DP", "value": 521.36, "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "branchNumber": "0001", "fullAccountNumber": bankingAccount.fullAccountNumber, "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }, { "transactionType": "DP", "value": 521.36, "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "branchNumber": "0001", "fullAccountNumber": bankingAccount.fullAccountNumber, "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }];

        request(appMock)
            .get('/account/bank-statement')
            .query({ fullAccountNumber: bankingAccount.fullAccountNumber, branchNumber: bankingAccount.branchNumber })
            .expect(200, expected, done);
    });

    it('return another page of transactions list with 200 status', async (done) => {
        for (let i = 0; i < 22; ++i) {
            await createAndSaveMockDeposit(bankingAccount);
        }

        const expected = [{ "transactionType": "DP", "value": 521.36, "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "branchNumber": "0001", "fullAccountNumber": bankingAccount.fullAccountNumber, "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }, { "transactionType": "DP", "value": 521.36, "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "branchNumber": "0001", "fullAccountNumber": bankingAccount.fullAccountNumber, "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }];

        request(appMock)
            .get('/account/bank-statement')
            .query({ fullAccountNumber: bankingAccount.fullAccountNumber, branchNumber: bankingAccount.branchNumber, page: 2 })
            .expect(200, expected, done);
    });

    it('return error when failed to find banking accoount with 404 status', async (done) => {
        request(appMock)
            .get('/account/bank-statement')
            .query({ fullAccountNumber: '123456-6', branchNumber: '0001' })
            .expect(404, 'Failed to find client. Banking account not found!', done);
    });
});
