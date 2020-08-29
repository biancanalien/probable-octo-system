import { createMockClientBody } from '../_mocks_/bodyMock';
import appMock from './_helpers_/appMock';
import dbMock from './_helpers_/dbMock';
import { baseURL } from '../../../constant/route';
import request from 'supertest';

const currentDate = Date.now();
const random = Math.random();

describe('test create banking account services', () => {
    const bankingAccountEndpoint = `${baseURL}/account/new`;

    beforeAll(async () => {
        await dbMock.connect();
        global.Date.now = jest.fn(() => new Date('2020-08-26T14:37:22.418Z').getTime())
        global.Math.random = jest.fn(() => 0.5)
    });

    afterAll(async () => {
        await dbMock.disconnect();
        global.Date.now = currentDate;
        global.Math.random = random;
    });

    afterEach(async () => {
        await dbMock.clearDatabase();
    });


    it('return saved banking account with 201 status', async (done) => {
        const bodyMock = createMockClientBody({});
        const expected = { 'availableBalance': 'R$ 0.00', 'branchNumber': '0001', 'email': 'cintia@email.com', 'fullAccountNumber': '550000-0', 'fullName': 'Cintia Carvalho', };
        request(appMock)
            .post(bankingAccountEndpoint)
            .send(bodyMock)
            .expect(201, (err, resp) => {
                if (err) console.error(err);
                expect(JSON.parse(resp.text)).toEqual(expected);
                done();
            });
    });

    it('return error when saving deposit has invalid values with 422 status', async (done) => {
        const bodyMock = createMockClientBody({ fullName: '' });

        request(appMock)
            .post(bankingAccountEndpoint)
            .send(bodyMock)
            .expect(422, 'Failed to create banking account. Request body with invalid values.', done);
    });

})
