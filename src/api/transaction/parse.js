
import { formatToBRDateString } from '../../helpers/dateHelper';

export const parseTransaction = (
    { transactionType, value, actionType, labelDescription, branchNumber, fullAccountNumber, operation, date },
    { availableBalance }) => ({
        transactionType,
        value,
        actionType,
        labelDescription,
        branchNumber,
        fullAccountNumber,
        operation,
        date: formatToBRDateString(date),
        availableBalance
    });

export const parseBankStatement = (
    { transactionType, value, actionType, labelDescription, branchNumber, fullAccountNumber, operation, date }) => ({
        transactionType,
        value,
        actionType,
        labelDescription,
        branchNumber,
        fullAccountNumber,
        operation,
        date: formatToBRDateString(date)
    });