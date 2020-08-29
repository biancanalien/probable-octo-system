import bankingAccountService from '../../account/service';
import { createMockClientBody } from '../_mocks_/bodyMock';

describe('test validateBankingAccount service', () => {
    it('return false when fullName is null', async () => {
        const m = createMockClientBody({ fullName: null });
        const output = bankingAccountService.validateBankingAccount(m);
        expect(output).toBeFalsy();
        expect(m.fullName).toEqual(null);
    });

    it('return false when fullName is empty', async () => {
        const m = createMockClientBody({ fullName: "" });
        const output = bankingAccountService.validateBankingAccount(m);
        expect(output).toBeFalsy();
        expect(m.fullName).toEqual("");
    });

    it('return false when email is null', async () => {
        const m = createMockClientBody({ email: null });
        const output = bankingAccountService.validateBankingAccount(m);
        expect(output).toBeFalsy();
        expect(m.email).toEqual(null);
    });

    it('return false when email is empty', async () => {
        const m = createMockClientBody({ email: "" });
        const output = bankingAccountService.validateBankingAccount(m);
        expect(output).toBeFalsy();
        expect(m.email).toEqual("");
    });

    it('return false when document is null', async () => {
        const m = createMockClientBody({ document: null });
        const output = bankingAccountService.validateBankingAccount(m);
        expect(output).toBeFalsy();
        expect(m.document).toEqual(null);
    });

    it('return false when document is empty', async () => {
        const m = createMockClientBody({ document: "" });
        const output = bankingAccountService.validateBankingAccount(m);
        expect(output).toBeFalsy();
        expect(m.document).toEqual("");
    });
});