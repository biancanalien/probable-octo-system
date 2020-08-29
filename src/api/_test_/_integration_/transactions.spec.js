import { createAndSaveMockDeposit, createAndSaveMockAccount } from './_helpers_/dataMock';
import appMock from './_helpers_/appMock';
import dbMock from './_helpers_/dbMock';
import { baseURL } from '../../../constant/route';
import request from 'supertest';

const currentDate = Date.now();

describe('test get bank statement service', () => {
    let bankingAccount = null;
    const bankStatementEndpoint = `${baseURL}/bank-statement`;

    beforeAll(async () => {
        await dbMock.connect();
        global.Date.now = jest.fn(() => new Date('2020-08-26T14:37:22.418Z').getTime())
    });

    beforeEach(async () => {
        const currentUser = await createAndSaveMockAccount();
        bankingAccount = currentUser.bankingAccount;
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

        const expected = { "bankStatementResult": [{ "transactionType": "DP", "value": "R$ 521.36", "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }, { "transactionType": "DP", "value": "R$ 521.36", "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }, { "transactionType": "DP", "value": "R$ 521.36", "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }], "currentBankingAccount": { "branchNumber": "0001", "fullAccountNumber": bankingAccount.fullAccountNumber, "availableBalance": "R$ 1564.08" } };

        request(appMock)
            .get(bankStatementEndpoint)
            .set('Authorization', `fakeToken&${bankingAccount.fullAccountNumber}&${bankingAccount.branchNumber}`)
            .expect(200, JSON.stringify(expected), done);
    });

    it('return another page of transactions list with 200 status', async (done) => {
        for (let i = 0; i < 22; ++i) {
            await createAndSaveMockDeposit(bankingAccount);
        }

        const expected = { "bankStatementResult": [{ "transactionType": "DP", "value": "R$ 521.36", "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }, { "transactionType": "DP", "value": "R$ 521.36", "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }], "currentBankingAccount": { "branchNumber": "0001", "fullAccountNumber": bankingAccount.fullAccountNumber, "availableBalance": "R$ 11469.92" } };

        request(appMock)
            .get(bankStatementEndpoint)
            .set('Authorization', `fakeToken&${bankingAccount.fullAccountNumber}&${bankingAccount.branchNumber}`)
            .query({ page: 2 })
            .expect(200, JSON.stringify(expected), done);
    });

    it('return error when failed to find banking accoount with 404 status', async (done) => {
        request(appMock)
            .get(bankStatementEndpoint)
            .set('Authorization', `fakeToken&notexistaccountnumber&notexistbranchnumber`)
            .expect(403, 'User has no permission', done);
    });
});
