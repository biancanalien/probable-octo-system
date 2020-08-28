import { createAndSaveMockDeposit, createAndSaveMockAccount, createMockWithdrawBody } from './dataMock';
import appMock from './appMock';
import dbMock from './dbMock';
import request from 'supertest';

const currentDate = Date.now();

describe('test withdraw service', () => {
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

    describe('withdraw some money', () => {
        it('return saved withdraw transaction with 200 status', async (done) => {
            const deposit = await createAndSaveMockDeposit(bankingAccount);

            expect(deposit.availableBalance).toEqual(521.36);

            const bodyMock = createMockWithdrawBody({});

            const expected = `{\"transactionType\":\"WD\",\"value\":36.45,\"actionType\":\"D\",\"labelDescription\":\"Banco 24 Horas\",\"branchNumber\":\"0001\",\"fullAccountNumber\":\"${bankingAccount.fullAccountNumber}\",\"operation\":{\"financialInstitution\":{\"companyName\":\"Banco 24 Horas\",\"cnpj\":\"24.363.105/0001-73\"}},\"date\":\"26/08/2020 11:37:22\",\"availableBalance\":484.91}`;

            request(appMock)
                .post('/account/withdraw')
                .send(bodyMock)
                .set('Authorization', `fakeToken&${bankingAccount.fullAccountNumber}&${bankingAccount.branchNumber}`)
                .expect(201, (err, resp) => {
                    if (err) throw err;
                    expect(resp.text).toEqual(expected);
                    done();
                });
        });

        it('return error when body is invalid with 422 status', async (done) => {
            const deposit = await createAndSaveMockDeposit(bankingAccount);

            expect(deposit.availableBalance).toEqual(521.36);

            const bodyMock = createMockWithdrawBody({ financialInstitution: null });

            request(appMock)
                .post('/account/withdraw')
                .set('Authorization', `fakeToken&${bankingAccount.fullAccountNumber}&${bankingAccount.branchNumber}`)
                .send(bodyMock)
                .expect(422, 'Failed to save withdraw transaction. Request body with invalid values.', done);
        });

        it('return error when banking account not exist with 404 status', async (done) => {
            const bodyMock = createMockWithdrawBody({});

            request(appMock)
                .post('/account/withdraw')
                .set('Authorization', `fakeToken&notexist&notexist`)
                .send(bodyMock)
                .expect(403, 'User has no permission', done);
        });

        it('return error when value is bigger than available balance with 500 status', async (done) => {
            const deposit = await createAndSaveMockDeposit(bankingAccount);

            expect(deposit.availableBalance).toEqual(521.36);

            const bodyMock = createMockWithdrawBody({ value: 600.45 });

            request(appMock)
                .post('/account/withdraw')
                .set('Authorization', `fakeToken&${bankingAccount.fullAccountNumber}&${bankingAccount.branchNumber}`)
                .send(bodyMock)
                .expect(422, 'Failed to withdraw this value. Not enough balance available!', done);
        });
    })
});