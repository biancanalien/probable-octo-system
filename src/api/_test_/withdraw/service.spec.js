import transactionService from '../../transaction/service';
import withdrawService from '../../withdraw/service';
import { mockWithDrawTransactionModel } from '../_mocks_/modelMock';
import { createMockWithdrawBody, createMockBankingAccountBody } from '../_mocks_/bodyMock';

describe('test validate withdraw service', () => {

    describe('value field', () => {
        it('return false when value is null', async () => {
            const m = createMockWithdrawBody({ value: null });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(null);
        });

        it('return false when value is zero', async () => {
            const m = createMockWithdrawBody({ value: 0 });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(0);
        });

        it('return false when value is less than zero', async () => {
            const m = createMockWithdrawBody({ value: -10.54 });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(-10.54);
        });

        it('return true when value is bigger than zero', async () => {
            const m = createMockWithdrawBody({ value: 20.54 });
            const output = await withdrawService.validate(m);
            expect(output).toBeTruthy();
            expect(m.value).toEqual(20.54);
        });
    });

    describe('financialInstitution field', () => {

        it('return false when financialInstitution is null', async () => {
            const m = createMockWithdrawBody({ financialInstitution: null });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(null);
        });

        it('return false when financialInstitution.companyName is null', async () => {
            const financialInstitution = { companyName: null, cnpj: "24.363.105/0001-73" };
            const m = createMockWithdrawBody({ financialInstitution });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(financialInstitution);
        });

        it('return false when financialInstitution.companyName is empty', async () => {
            const financialInstitution = { companyName: "", cnpj: "24.363.105/0001-73" };
            const m = createMockWithdrawBody({ financialInstitution });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(financialInstitution);
        });

        it('return false when financialInstitution.cnpj is null', async () => {
            const financialInstitution = { companyName: "Banco 24 Horas", cnpj: null };
            const m = createMockWithdrawBody({ financialInstitution });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(financialInstitution);
        });

        it('return false when financialInstitution.cnpj is empty', async () => {
            const financialInstitution = { companyName: "Banco 24 Horas", cnpj: "" };
            const m = createMockWithdrawBody({ financialInstitution });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(financialInstitution);
        });
    });
});

describe('test save service', () => {

    const mockCreateTransaction = transactionService.create = jest.fn();

    it('save withdraw correctly', async () => {
        mockCreateTransaction.mockReturnValueOnce(mockWithDrawTransactionModel);
        const mw = createMockWithdrawBody({});
        const mb = createMockBankingAccountBody({});
        const output = await withdrawService.save(mw, mb);
        expect(output).toEqual({ "_id": "5f481647e864e3722befc81d", "actionType": "D", "branchNumber": "0001", "date": "1598559815898", "fullAccountNumber": "543190-0", "labelDescription": "Banco 24 Horas", "operation": { "financialInstitution": { "cnpj": "24.363.105/0001-73", "companyName": "Banco 24 Horas", }, }, "transactionType": "WD", "value": 20.45, });
    });
});
