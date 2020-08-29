export const createMockBankingAccountBody = ({
    branchNumber = '0001',
    branchNumberDigit = '0',
    accountNumber = '543190',
    accountNumberDigit = '0',
    fullAccountNumber = '543190-0',
    availableBalance = 535.36
}) => {
    return { branchNumber, branchNumberDigit, accountNumber, accountNumberDigit, fullAccountNumber, availableBalance };
};

export const createMockDepositBody = ({
    depositType = 'DOC',
    value = 521.36,
    payingSource = {
        bankName: 'Banco Raiz',
        bankNumber: '123',
        branchNumber: '2345',
        fullAccountNumber: '654321-0',
        clientName: 'Bianca Nalien da Cunha Pereira'
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
    financialInstitution = {
        companyName: 'Banco 24 Horas',
        cnpj: '24.363.105/0001-73'
    }
}) => ({
    value,
    financialInstitution
});

export const createMockClientBody = ({
    fullName = 'Cintia Carvalho',
    document = '456.123.456-78',
    email = 'cintia@email.com'
}) => ({ fullName, document, email });