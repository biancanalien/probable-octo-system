import { formatToBRMoney } from '../../helpers/numberHelper';

export const parseAccountBanking = ({ fullName, email }, { branchNumber, fullAccountNumber, availableBalance }) => ({
    fullName,
    email,
    branchNumber,
    fullAccountNumber,
    availableBalance: formatToBRMoney(availableBalance)
});