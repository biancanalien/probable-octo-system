import { createAndSaveMockAccount } from './_helpers_/dataMock';
import { createMockDepositBody } from '../_mocks_/bodyMock';
import appMock from './_helpers_/appMock';
import dbMock from './_helpers_/dbMock';
import { baseURL } from '../../../constant/route';
import request from 'supertest';

const currentDate = Date.now();

describe('test save deposit service', () => {
    let bankingAccount = null;
    const depositEndpoint = `${baseURL}/operation/deposit`;

    beforeAll(async () => {
        await dbMock.connect();
        global.Date.now = jest.fn(() => new Date('2020-08-26T14:37:22.418Z').getTime())
    });

    beforeEach(async () => {
        const currentUser = await createAndSaveMockAccount();
        bankingAccount = currentUser.bankingAccount;
    })

    afterAll(async () => {
        await dbMock.disconnect();
        global.Date.now = currentDate;
    });

    afterEach(async () => {
        await dbMock.clearDatabase();
    });

    it('return saved deposit with 201 status', async (done) => {
        const bodyMock = createMockDepositBody({});
        const responseExpected = { "currentTransaction": { "transactionType": "DP", "value": "R$ 521.36", "actionType": "A", "labelDescription": "Bianca Nalien da Cunha Pereira | Banco Raiz", "operation": { "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "fullAccountNumber": "654321-0", "clientName": "Bianca Nalien da Cunha Pereira" }, "depositType": "DOC" }, "date": "26/08/2020 11:37:22" }, "currentBankingAccount": { "branchNumber": "0001", "fullAccountNumber": bankingAccount.fullAccountNumber, "availableBalance": "R$ 521.36" } };
        request(appMock)
            .post(depositEndpoint)
            .set('Authorization', `fakeToken&${bankingAccount.fullAccountNumber}&${bankingAccount.branchNumber}`)
            .send(bodyMock)
            .expect(201, JSON.stringify(responseExpected), done);
    });

    it('return error when saving deposit has invalid values with 422 status', async (done) => {
        const bodyMock = createMockDepositBody({ depositType: "BLA" });

        request(appMock)
            .post(depositEndpoint)
            .set('Authorization', `fakeToken&${bankingAccount.fullAccountNumber}&${bankingAccount.branchNumber}`)
            .send(bodyMock)
            .expect(422, 'Failed to save deposit transaction. Request body with invalid values.', done);
    });

    it('return error when banking account not found with 404 status', (done) => {
        const bodyMock = createMockDepositBody({});
        request(appMock)
            .post(depositEndpoint)
            .set('Authorization', `fakeToken&notValidAccountNumber&notValidBranchNumber`)
            .send(bodyMock)
            .expect(403, 'User has no permission', done);
    });
});