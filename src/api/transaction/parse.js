
import { formatToBRDateString } from '../../helpers/dateHelper';

export const parseTransaction = (
    { transactionType, value, actionType, labelDescription, branchNumber, fullAccountNumber, operation, date },
    { avaliableBalance }) => ({
        transactionType,
        value,
        actionType,
        labelDescription,
        branchNumber,
        fullAccountNumber,
        operation,
        date: formatToBRDateString(date),
        avaliableBalance
    });