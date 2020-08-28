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
    async save(operation, bankingAccount) {
        const newTransaction = mountWithdrawOperation(operation, bankingAccount);
        return await transactionService.create(newTransaction, bankingAccount);
    }
}

const mountWithdrawOperation = ({ value, financialInstitution }, bankingAccount) => {
    return {
        transactionType: transactionType.Withdraw,
        value,
        actionType: actionType.Debit,
        labelDescription: financialInstitution.companyName,
        branchNumber: bankingAccount.branchNumber,
        fullAccountNumber: bankingAccount.fullAccountNumber,
        operation: { financialInstitution }
    };
};

export default withdrawService;