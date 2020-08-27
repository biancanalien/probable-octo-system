import bankingAccountService from '../account/service';
import depositService from '../deposit/service';

export const createMockDepositBody = ({
    depositType = "DOC",
    value = 521.36,
    branchNumber = "1234",
    fullAccountNumber = "123456-6",
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
        branchNumber,
        fullAccountNumber,
        payingSource
    };
};

export const createAndSaveMockDeposit = async (fullAccountNumber, branchNumber, depositBody = null) => {
    if (depositBody == null) {
        depositBody = createMockDepositBody({ branchNumber, fullAccountNumber });
    }

    return await depositService.save(depositBody);
};

export const createAndSaveMockAccount = async () => {
    return await bankingAccountService.create({
        fullName: "Maria Andrade Pires",
        document: "123.456.456-98",
        email: "maria@email.com"
    });
};