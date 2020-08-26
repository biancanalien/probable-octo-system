import bankingAccountService from '../account/service';

import appMock from './appMock';
import dbMock from './dbMock';
import request from 'supertest';

const currentDate = Date.now();

beforeAll(async () => {
    await dbMock.connect();
    global.Date.now = jest.fn(() => new Date('2020-08-26T14:37:22.418Z').getTime())
});

afterEach(async () => {
    await dbMock.clearDatabase();
});

afterAll(async () => {
    await dbMock.disconnect();
    global.Date.now = currentDate;
});

describe('test save deposit service', () => {
    it('return saved deposit with 201 status', async (done) => {
        const { branchNumber, fullAccountNumber } = await createMockAccount();
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
            avaliableBalance: 521.36
        };

        request(appMock)
            .post('/account/deposit')
            .send(bodyMock)
            .expect(201, responseExpected, done);
    });

    it('return error when saving deposit has invalid values with 422 status', async (done) => {
        const { branchNumber, fullAccountNumber } = await createMockAccount();
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

const createMockDepositBody = ({
    depositType = "DOC",
    value = 521.36,
    branchNumber = "1234",
    fullAccountNumber = "123456-6",
    payingSource = {
        bankName: "Banco Raiz",
        bankNumber: "123",
        branchNumber: "2345",
        fullAccountNumber: "654321-0",
        clientName: "Bianca Nalien da Cunha Pereira"
    }
}) => {
    return {
        depositType,
        value,
        branchNumber,
        fullAccountNumber,
        payingSource
    };
};

const createMockAccount = async () => {
    return await bankingAccountService.create({
        fullName: "Maria Andrade Pires",
        document: "123.456.456-98",
        email: "maria@email.com"
    });
};