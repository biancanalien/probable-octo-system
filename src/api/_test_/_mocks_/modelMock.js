export const mockWithDrawTransactionModel = {
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

export const mockDepositTransactionModel = {
    _id: "5f481647e864e3722befc81b",
    transactionType: "DP",
    value: 20.45,
    actionType: "A",
    labelDescription: "José Maria Silva | Banco Raiz",
    branchNumber: "0001",
    fullAccountNumber: "543190-0",
    operation: {
        payingSource: {
            bankName: "Banco Raiz",
            bankNumber: "123",
            branchNumber: "2345",
            fullAccountNumber: "654321-0",
            clientName: "Carol Silva e Silva"
        },
        depositType: "DOC"
    },
    date: "1598559815898"
};