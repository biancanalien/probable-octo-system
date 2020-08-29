import bankingAccountService from '../../account/service';
import bankingAccountModel from '../../account/model';
import {
    createMockClientBody,
    createMockBankingAccountBody,
    createMockDepositBody,
    createMockWithdrawBody
} from '../_mocks_/bodyMock';

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

describe('test updateAvailableBalance service', () => {
    const mockFindOneAndUpdate = bankingAccountModel.findOneAndUpdate = jest.fn();

    it('actionType A return bigger availableBalance', async () => {
        mockFindOneAndUpdate.mockReturnValueOnce({
            _id: "5f4955c461fe774ff21bbfc0",
            clientCode: "5f4955c361fe774ff21bbfbf",
            branchNumber: "0001",
            branchNumberDigit: "0",
            accountNumber: "543190",
            accountNumberDigit: "0",
            fullAccountNumber: "543190-0",
            availableBalance: "1056.72"
        });
        const mockBankingAccount = createMockBankingAccountBody({});
        const mockDepositAccount = createMockDepositBody({});
        const output = await bankingAccountService.updateAvailableBalance(mockDepositAccount, mockBankingAccount);
        expect(output).toEqual({ "_id": "5f4955c461fe774ff21bbfc0", "accountNumber": "543190", "accountNumberDigit": "0", "availableBalance": "1056.72", "branchNumber": "0001", "branchNumberDigit": "0", "clientCode": "5f4955c361fe774ff21bbfbf", "fullAccountNumber": "543190-0" });
        expect(mockBankingAccount.availableBalance).toEqual(535.36);
        expect(mockDepositAccount.value).toEqual(521.36);
        expect(output.availableBalance).toEqual("1056.72");
    });

    it('actionType D return less availableBalance', async () => {
        mockFindOneAndUpdate.mockReturnValueOnce({
            _id: "5f4955c461fe774ff21bbfc0",
            clientCode: "5f4955c361fe774ff21bbfbf",
            branchNumber: "0001",
            branchNumberDigit: "0",
            accountNumber: "543190",
            accountNumberDigit: "0",
            fullAccountNumber: "543190-0",
            availableBalance: "498.91"
        });
        const mockBankingAccount = createMockBankingAccountBody({});
        const mockWithdrawAccount = createMockWithdrawBody({});
        const output = await bankingAccountService.updateAvailableBalance(mockWithdrawAccount, mockBankingAccount);
        expect(output).toEqual({ "_id": "5f4955c461fe774ff21bbfc0", "accountNumber": "543190", "accountNumberDigit": "0", "availableBalance": "498.91", "branchNumber": "0001", "branchNumberDigit": "0", "clientCode": "5f4955c361fe774ff21bbfbf", "fullAccountNumber": "543190-0" });
        expect(mockBankingAccount.availableBalance).toEqual(535.36);
        expect(mockWithdrawAccount.value).toEqual(36.45);
        expect(output.availableBalance).toEqual("498.91");
    });
});