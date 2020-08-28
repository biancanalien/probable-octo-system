import depositService from './service';

describe('test validateDeposit service', () => {

    describe('depositType field', () => {
        it('return false when depositType is null', async () => {
            const m = mockDeposit({ depositType: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual(null);
        });

        it('return false when depositType is not valid', async () => {
            const m = mockDeposit({ depositType: "BLA" });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("BLA");
        });

        it('return true when depositType is TED', async () => {
            const m = mockDeposit({ depositType: "TED" });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual("TED");
        });

        it('return true when depositType is DOC', async () => {
            const m = mockDeposit({ depositType: 'DOC' });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual('DOC');
        });

        it('return true when depositType is BLT', async () => {
            const m = mockDeposit({ depositType: 'BLT', payingSource: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual('BLT');
        });
    });

    describe('value field', () => {
        it('return false when value is null', async () => {
            const m = mockDeposit({ value: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(null);
        });

        it('return false when value is zero', async () => {
            const m = mockDeposit({ value: 0 });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(0);
        });

        it('return false when value is less than zero', async () => {
            const m = mockDeposit({ value: -10.54 });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.value).toEqual(-10.54);
        });

        it('return true when value is bigger than zero', async () => {
            const m = mockDeposit({ value: 20.54 });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.value).toEqual(20.54);
        });
    });

    describe('payingSource field', () => {
        it('return false when depositType is DOC and payingSource is null', async () => {
            const m = mockDeposit({ payingSource: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(null);
        });

        it('return false when depositType is DOC and payingSource.bankName is null', async () => {
            const psm = { bankName: null, bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.bankName is empty', async () => {
            const psm = { bankName: " ", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.bankNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: null, branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.bankNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: null, branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.branchNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: null, fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.branchNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: " ", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.fullAccountNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: null, clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.fullAccountNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: " ", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.clientName is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: null };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is DOC and payingSource.fullAccountNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: " " };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return true when depositType is DOC and payingSource is complete', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual("DOC");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource is null', async () => {
            const m = mockDeposit({ depositType: "TED", payingSource: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(null);
        });

        it('return false when depositType is TED and payingSource.bankName is null', async () => {
            const psm = { bankName: null, bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.bankName is empty', async () => {
            const psm = { bankName: " ", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.bankNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: null, branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.bankNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: null, branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.branchNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: null, fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.branchNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: " ", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.fullAccountNumber is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: null, clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.fullAccountNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: " ", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.clientName is null', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: null };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return false when depositType is TED and payingSource.fullAccountNumber is empty', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: " " };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeFalsy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return true when depositType is TED and payingSource is complete', async () => {
            const psm = { bankName: "Banco Raiz", bankNumber: "123", branchNumber: "2345", fullAccountNumber: "654321-0", clientName: "Bianca Nalien da Cunha Pereira" };
            const m = mockDeposit({ depositType: "TED", payingSource: psm });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual("TED");
            expect(m.payingSource).toEqual(psm);
        });

        it('return true when depositType is BLT and payingSource is null', async () => {
            const m = mockDeposit({ depositType: "BLT", payingSource: null });
            const output = await depositService.validateDeposit(m);
            expect(output).toBeTruthy();
            expect(m.depositType).toEqual("BLT");
            expect(m.payingSource).toEqual(null);
        });
    });
});

const mockDeposit = ({
    depositType = "DOC",
    value = 521.36,
    payingSource = {
        bankName: "Banco Raiz",
        bankNumber: "123",
        branchNumber: "2345",
        fullAccountNumber: "654321-0",
        clientName: "Bianca Nalien da Cunha Pereira"
    }
}) => {
    return { depositType, value, payingSource };
};