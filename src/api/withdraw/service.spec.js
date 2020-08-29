import transactionService from '../transaction/service';
import withdrawService from './service';

describe('test validate withdraw service', () => {

    describe('value field', () => {
        it('return false when value is null', async () => {
            const m = mockWithdraw({ value: null });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(null);
        });

        it('return false when value is zero', async () => {
            const m = mockWithdraw({ value: 0 });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(0);
        });

        it('return false when value is less than zero', async () => {
            const m = mockWithdraw({ value: -10.54 });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(-10.54);
        });

        it('return true when value is bigger than zero', async () => {
            const m = mockWithdraw({ value: 20.54 });
            const output = await withdrawService.validate(m);
            expect(output).toBeTruthy();
            expect(m.value).toEqual(20.54);
        });
    });

    describe('financialInstitution field', () => {

        it('return false when financialInstitution is null', async () => {
            const m = mockWithdraw({ financialInstitution: null });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(null);
        });

        it('return false when financialInstitution.companyName is null', async () => {
            const financialInstitution = { companyName: null, cnpj: "24.363.105/0001-73" };
            const m = mockWithdraw({ financialInstitution });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(financialInstitution);
        });

        it('return false when financialInstitution.companyName is empty', async () => {
            const financialInstitution = { companyName: "", cnpj: "24.363.105/0001-73" };
            const m = mockWithdraw({ financialInstitution });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(financialInstitution);
        });

        it('return false when financialInstitution.cnpj is null', async () => {
            const financialInstitution = { companyName: "Banco 24 Horas", cnpj: null };
            const m = mockWithdraw({ financialInstitution });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(financialInstitution);
        });

        it('return false when financialInstitution.cnpj is empty', async () => {
            const financialInstitution = { companyName: "Banco 24 Horas", cnpj: "" };
            const m = mockWithdraw({ financialInstitution });
            const output = await withdrawService.validate(m);
            expect(output).toBeFalsy();
            expect(m.financialInstitution).toEqual(financialInstitution);
        });
    });
});

describe('test save service', () => {

    const mockCreateTransaction = transactionService.create = jest.fn();

    it('save withdraw correctly', async () => {
        mockCreateTransaction.mockReturnValueOnce(mockTransactionModel);
        const mw = mockWithdraw({});
        const mb = mockBankingAccount({});
        const output = await withdrawService.save(mw, mb);
        expect(output).toEqual({ "_id": "5f481647e864e3722befc81d", "actionType": "D", "branchNumber": "0001", "date": "1598559815898", "fullAccountNumber": "543190-0", "labelDescription": "Banco 24 Horas", "operation": { "financialInstitution": { "cnpj": "24.363.105/0001-73", "companyName": "Banco 24 Horas", }, }, "transactionType": "WD", "value": 20.45, });
    });
});

const mockTransactionModel = {
    _id: "5f481647e864e3722befc81d",
    transactionType: "WD",
    value: 20.45,
    actionType: "D",
    labelDescription: "Banco 24 Horas",
    branchNumber: "0001",
    fullAccountNumber: "543190-0",
    operation: {
        financialInstitution: {
            companyName: "Banco 24 Horas",
            cnpj: "24.363.105/0001-73"
        }
    },
    date: "1598559815898"
};

const mockBankingAccount = ({
    branchNumber = "0001",
    branchNumberDigit = "0",
    accountNumber = "543190",
    accountNumberDigit = "0",
    fullAccountNumber = "543190-0",
    availableBalance = 535.36
}) => {
    return { branchNumber, branchNumberDigit, accountNumber, accountNumberDigit, fullAccountNumber, availableBalance };
};

const mockWithdraw = ({
    value = 100.55,
    financialInstitution = {
        companyName: "Banco 24 Horas",
        cnpj: "24.363.105/0001-73"
    } }) => {
    return { value, financialInstitution };
};