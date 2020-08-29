import { transactionType, actionType } from '../../constant/transactionEnum';
import transactionService from '../transaction/service';
import { depositTypeEnum } from '../../constant/depositEnum';
import { stringIsNullOrEmpty } from '../../helpers/stringHelper';
import { transformToNumber } from '../../helpers/numberHelper';

const depositService = {
    async validateDeposit({ depositType = null, value = null, payingSource = null }) {
        let depositIsValid = depositType != null &&
            depositTypeEnum.includes(depositType.toUpperCase()) &&
            value != null && value > 0;

        if (depositType != 'BLT') {
            depositIsValid = depositIsValid &&
                payingSource != null &&
                !stringIsNullOrEmpty(payingSource.bankName) &&
                !stringIsNullOrEmpty(payingSource.bankNumber) &&
                !stringIsNullOrEmpty(payingSource.branchNumber) &&
                !stringIsNullOrEmpty(payingSource.fullAccountNumber) &&
                !stringIsNullOrEmpty(payingSource.clientName);
        }
        return depositIsValid;
    },
    async save(operation, bankingAccount) {
        const newTransaction = mountDepositTransaction(operation, bankingAccount);
        return await transactionService.create(newTransaction, bankingAccount);
    }
}

const mountDepositTransaction = (operation, bankingAccount) => {
    const depositOperation = mountDepositOperation(operation);
    const labelDescription = mountLabelDescription(depositOperation);

    return {
        transactionType: transactionType.Deposit,
        value: transformToNumber(operation.value),
        actionType: actionType.Addition,
        labelDescription,
        branchNumber: bankingAccount.branchNumber,
        fullAccountNumber: bankingAccount.fullAccountNumber,
        operation: depositOperation
    };
}

const mountDepositOperation = ({ payingSource = null, depositType }) => ({
    payingSource,
    depositType
});

const mountLabelDescription = ({ depositType, payingSource }) => {
    if (depositType === 'BLT') {
        return 'Depósito por boleto';
    }

    const { bankName = null, clientName = null } = payingSource;
    return `${clientName} | ${bankName}`;
};

export default depositService;