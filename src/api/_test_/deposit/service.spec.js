import transactionService from '../../transaction/service';
import depositService from '../../deposit/service';
import { mockDepositTransactionModel } from '../_mocks_/modelMock';
import { createMockDepositBody, createMockBankingAccountBody } from '../_mocks_/bodyMock';

describe('test validateDeposit service', () => {

    describe('depositType field', () => {
        it('return false when depositType is null', async () => {
            const m = createMockDepositBody({ depositType: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual(null);
        });

        it('return false when depositType is not valid', async () => {
            const m = createMockDepositBody({ depositType: "BLA" });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("BLA");
        });

        it('return true when depositType is TED', async () => {
            const m = createMockDepositBody({ depositType: "TED" });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual("TED");
        });

        it('return true when depositType is DOC', async () => {
            const m = createMockDepositBody({ depositType: 'DOC' });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual('DOC');
        });

        it('return true when depositType is BLT', async () => {
            const m = createMockDepositBody({ depositType: 'BLT', payingSource: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual('BLT');
        });
    });

    describe('value field', () => {
        it('return false when value is null', async () => {
            const m = createMockDepositBody({ value: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(null);
        });

        it('return false when value is zero', async () => {
            const m = createMockDepositBody({ value: 0 });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(0);
        });

        it('return false when value is less than zero', async () => {
            const m = createMockDepositBody({ value: -10.54 });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(-10.54);
        });

        it('return true when value is bigger than zero', async () => {
            const m = createMockDepositBody({ value: 20.54 });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.value).toEqual(20.54);
        });
    });

    describe('payingSource field', () => {
        it('return false when depositType is DOC and payingSource is null', async () => {
            const m = createMockDepositBody({ payingSource: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(null);
        });

        it('return false when depositType is DOC and payingSource.bankName is null', async () => {
            const psm = { bankName: null, bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.bankName is empty', async () => {
            const psm = { bankName: " ", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.bankNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: null, branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.bankNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: null, branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.branchNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: null, fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.branchNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: " ", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.fullAccountNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: null, clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.fullAccountNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: " ", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.clientName is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: null };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.fullAccountNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: " " };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return true when depositType is DOC and payingSource is complete', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource is null', async () => {
            const m = createMockDepositBody({ depositType: "TED", payingSource: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(null);
        });

        it('return false when depositType is TED and payingSource.bankName is null', async () => {
            const psm = { bankName: null, bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.bankName is empty', async () => {
            const psm = { bankName: " ", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.bankNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: null, branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.bankNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: null, branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.branchNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: null, fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.branchNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: " ", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.fullAccountNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: null, clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.fullAccountNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: " ", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.clientName is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: null };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.fullAccountNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: " " };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return true when depositType is TED and payingSource is complete', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = createMockDepositBody({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return true when depositType is BLT and payingSource is null', async () => {
            const m = createMockDepositBody({ depositType: "BLT", payingSource: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual("BLT");
            expect(m.payingSource).toEqual(null);
        });
    });
});

describe('test save service', () => {

    const mockCreateTransaction = transactionService.create = jest.fn();

    it('save deposit correctly', async () => {
        mockCreateTransaction.mockReturnValueOnce(mockDepositTransactionModel);
        const md = createMockDepositBody({});
        const mb = createMockBankingAccountBody({});
        const output = await depositService.save(md, mb);
        expect(output).toEqual({ "_id": "5f481647e864e3722befc81b", "actionType": "A", "branchNumber": "0001", "date": "1598559815898", "fullAccountNumber": "543190-0", "labelDescription": "José Maria Silva | Banco Raiz", "operation": { "depositType": "DOC", "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "clientName": "Carol Silva e Silva", "fullAccountNumber": "654321-0" } }, "transactionType": "DP", "value": 20.45 });
    });
});