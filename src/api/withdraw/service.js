import { transactionType, actionType } from '../../constant/transactionEnum';
import transactionService from '../transaction/service';
import { stringIsNullOrEmpty } from '../../helpers/stringHelper';

const withdrawService = {
    async validate({ value = null, branchNumber = null, fullAccountNumber = null, financialInstitution = null }) {
        return value != null && value > 0 &&
            !stringIsNullOrEmpty(branchNumber) &&
            !stringIsNullOrEmpty(fullAccountNumber) &&
            financialInstitution != null &&
            !stringIsNullOrEmpty(financialInstitution.cnpj) &&
            !stringIsNullOrEmpty(financialInstitution.companyName);
    },
    async save({ value, branchNumber, fullAccountNumber, financialInstitution }) {
        const newTransaction = {
            transactionType: transactionType.Withdraw,
            value: value,
            actionType: actionType.Debit,
            labelDescription: financialInstitution.companyName,
            branchNumber: branchNumber,
            fullAccountNumber: fullAccountNumber,
            operation: { financialInstitution }
        };

        return await transactionService.create(newTransaction);
    }
}

export default withdrawService;