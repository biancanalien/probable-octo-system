import transactionModel from '../../transaction/model';
import transactionService from '../../transaction/service';
import bankingAccountService from '../../account/service';
import {
    mockDepositTransactionModel,
    mockBankingAccountModel,
    mockWithDrawTransactionModel
} from '../_mocks_/modelMock';
import { createMockDepositBody, createMockBankingAccountBody, createMockWithdrawBody } from '../_mocks_/bodyMock';

describe('test create transaction service', () => {
    const mTransactionModel = transactionModel.create = jest.fn();
    const mBankingAccountService = bankingAccountService.updateAvailableBalance = jest.fn();

    it('create deposit transaction correctly', async () => {
        mTransactionModel.mockReturnValueOnce(mockDepositTransactionModel);
        mBankingAccountService.mockReturnValueOnce(mockBankingAccountModel);
        const output = await transactionService.create(createMockDepositBody({}), createMockBankingAccountBody({}));
        expect(output).toEqual({ "currentBankingAccount": { "availableBalance": "R$ 254.95", "branchNumber": "0001", "fullAccountNumber": "878564-0", }, "currentTransaction": { "actionType": "A", "date": "1598559815898", "labelDescription": "José Maria Silva | Banco Raiz", "operation": { "depositType": "DOC", "payingSource": { "bankName": "Banco Raiz", "bankNumber": "123", "branchNumber": "2345", "clientName": "Carol Silva e Silva", "fullAccountNumber": "654321-0", }, }, "transactionType": "DP", "value": "R$ 20.45" }, });
    });

    it('create withdraw transaction correctly', async () => {
        mTransactionModel.mockReturnValueOnce(mockWithDrawTransactionModel);
        mBankingAccountService.mockReturnValueOnce(mockBankingAccountModel);
        const output = await transactionService.create(createMockWithdrawBody({}), createMockBankingAccountBody({}));
        expect(output).toEqual({ "currentTransaction": { "transactionType": "WD", "value": "R$ 20.45", "actionType": "D", "labelDescription": "Banco 24 Horas", "operation": { "financialInstitution": { "companyName": "Banco 24 Horas", "cnpj": "24.363.105/0001-73" } }, "date": "1598559815898" }, "currentBankingAccount": { "branchNumber": "0001", "fullAccountNumber": "878564-0", "availableBalance": "R$ 254.95" } });
    });
});