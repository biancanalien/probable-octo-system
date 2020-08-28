import bankingAccountService from '../account/service';
import depositService from '../deposit/service';

export const createMockDepositBody = ({
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
    return {
        depositType,
        value,
        payingSource
    };
};

export const createMockWithdrawBody = ({
    value = 36.45,
    branchNumber = "0001",
    fullAccountNumber = "817391-0",
    financialInstitution = {
        companyName: "Banco 24 Horas",
        cnpj: "24.363.105/0001-73"
    }
}) => ({
    value,
    branchNumber,
    fullAccountNumber,
    financialInstitution
});

export const createAndSaveMockDeposit = async (bankingAccount, depositBody = null) => {
    if (depositBody == null) {
        depositBody = createMockDepositBody({ branchNumber: bankingAccount.branchNumber, fullAccountNumber: bankingAccount.fullAccountNumber });
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