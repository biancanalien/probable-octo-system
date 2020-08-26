import { transactionType, actionType } from '../../constant/transactionEnum';
import transactionService from '../transaction/service';
import { depositTypeEnum } from '../../constant/depositEnum';
import { stringIsNullOrEmpty } from '../../helpers/stringHelper';

const depositService = {
    async validateDeposit({ depositType = null, value = null, branchNumber = null, fullAccountNumber = null, payingSource = null }) {
        let depositIsValid = depositType != null &&
            depositTypeEnum.includes(depositType) &&
            value != null && value > 0 &&
            !stringIsNullOrEmpty(branchNumber) &&
            !stringIsNullOrEmpty(fullAccountNumber);

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
    async save(body) {
        const operation = createDepositOperation(body);

        const labelDescription = mountLabelDescription(operation);

        const newTransaction = {
            transactionType: transactionType.Deposit,
            value: body.value,
            actionType: actionType.Addition,
            labelDescription,
            branchNumber: body.branchNumber,
            fullAccountNumber: body.fullAccountNumber,
            operation
        };

        return await transactionService.create(newTransaction);
    }
}

const createDepositOperation = ({ payingSource = null, depositType }) => ({
    payingSource,
    depositType
});

const mountLabelDescription = ({ depositType, payingSource }) => {
    if (depositType === 'BLT') {
        return "Depósito por boleto";
    }

    const { bankName = null, clientName = null } = payingSource;
    return `${clientName} | ${bankName}`;
};

export default depositService;