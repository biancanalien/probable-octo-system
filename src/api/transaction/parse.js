
import { formatToBRDateString } from '../../helpers/dateHelper';
import { formatToBRMoney } from '../../helpers/numberHelper';

export const parseTransaction = (operation, bankingAccount) => ({
    currentTransaction: parseOperation(operation),
    currentBankingAccount: parseBankingAccount(bankingAccount)
});

export const parseBankStatement = (transactions, bankingAccount) => ({
    bankStatementResult: transactions.map(t => parseOperation(t)),
    currentBankingAccount: parseBankingAccount(bankingAccount)
});

const parseBankingAccount = ({ branchNumber, fullAccountNumber, availableBalance }) => ({
    branchNumber,
    fullAccountNumber,
    availableBalance: formatToBRMoney(availableBalance)
});

const parseOperation = ({ transactionType, value, actionType, labelDescription, operation, date }) => ({
    transactionType,
    value: formatToBRMoney(value),
    actionType,
    labelDescription,
    operation,
    date: formatToBRDateString(date),
});