import { createMockDepositBody, createAndSaveMockAccount } from './dataMock';
import appMock from './appMock';
import dbMock from './dbMock';
import request from 'supertest';

const currentDate = Date.now();

describe('test save deposit service', () => {

    beforeAll(async () => {
        await dbMock.connect();
        global.Date.now = jest.fn(() => new Date('2020-08-26T14:37:22.418Z').getTime())
    });

    afterAll(async () => {
        await dbMock.disconnect();
        global.Date.now = currentDate;
    });

    afterEach(async () => {
        await dbMock.clearDatabase();
    });

    it('return saved deposit with 201 status', async (done) => {
        const { branchNumber, fullAccountNumber } = await createAndSaveMockAccount();
        const bodyMock = createMockDepositBody({ branchNumber, fullAccountNumber });
        const responseExpected = {
            transactionType: 'DP',
            value: 521.36,
            actionType: 'A',
            labelDescription: 'Bianca Nalien da Cunha Pereira | Banco Raiz',
            branchNumber,
            fullAccountNumber,
            operation: {
                payingSource: {
                    bankName: 'Banco Raiz',
                    bankNumber: '123',
                    branchNumber: '2345',
                    fullAccountNumber: '654321-0',
                    clientName: 'Bianca Nalien da Cunha Pereira'
                },
                depositType: 'DOC'
            },
            date: '26/08/2020 11:37:22',
            availableBalance: 521.36
        };

        request(appMock)
            .post('/account/deposit')
            .send(bodyMock)
            .expect(201, responseExpected, done);
    });

    it('return error when saving deposit has invalid values with 422 status', async (done) => {
        const { branchNumber, fullAccountNumber } = await createAndSaveMockAccount();
        const bodyMock = createMockDepositBody({ depositType: "BLA", branchNumber, fullAccountNumber });

        request(appMock)
            .post('/account/deposit')
            .send(bodyMock)
            .expect(422, 'Failed to save deposit transaction. Request body with invalid values.', done);
    });

    it('return error when banking account not found with 404 status', (done) => {
        const bodyMock = createMockDepositBody({});

        request(appMock)
            .post('/account/deposit')
            .send(bodyMock)
            .expect(404, 'Failed to find client. Banking account not found!', done);
    });
});