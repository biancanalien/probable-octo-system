import bankingAccountService from '../../../account/service';
import depositService from '../../../deposit/service';
import { createMockDepositBody } from '../../_mocks_/bodyMock';

export const createAndSaveMockDeposit = async (bankingAccount, depositBody = null) => {
    if (depositBody == null) {
        depositBody = createMockDepositBody({});
    }

    return await depositService.save(depositBody, bankingAccount);
};

export const createAndSaveMockAccount = async () => {
    return await bankingAccountService.create({
        fullName: "Maria Andrade Pires",
        document: "123.456.456-98",
        email: "maria@email.com"
    });
};