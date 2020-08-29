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

export const mockBankingAccountModel = {
    _id: "5f4955c461fe774ff21bbfc0",
    clientCode: "5f4955c361fe774ff21bbfbf",
    branchNumber: "0001",
    branchNumberDigit: "0",
    accountNumber: "878564",
    accountNumberDigit: "0",
    fullAccountNumber: "878564-0",
    availableBalance: 254.95
};

export const mockBankStatementResult = [
    {
        _id: "5f494ee2e1b3ac4916af2804",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            financialInstitution: {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3fec",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af280s",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3fes",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2801",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3fe2",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2803",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3fe4",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2805",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3fe6",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2807",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3fe8",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2809",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3f10",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2811",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3f12",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2813",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3f14",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2815",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3f16",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2817",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3f18",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    },
    {
        _id: "5f494ee2e1b3ac4916af2819",
        transactionType: "WD",
        value: "100.55",
        actionType: "D",
        labelDescription: "Banco 24 Horas",
        branchNumber: "0001",
        fullAccountNumber: "543190-0",
        operation: {
            "financialInstitution": {
                "companyName": "Banco 24 Horas",
                "cnpj": "24.363.105/0001-73"
            }
        },
        date: "1598639842314"
    },
    {
        _id: "5f4916dbd102ca7365ae3f20",
        transactionType: "DP",
        value: "45.45",
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
                clientName: "José Maria Silva"
            },
            depositType: "DOC"
        },
        date: "1598625499259"
    }
];