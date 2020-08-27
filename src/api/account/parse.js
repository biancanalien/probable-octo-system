export const parseAccountBanking = ({ fullName, email }, { branchNumber, accountNumber, accountNumberDigit, availableBalance }) => ({
    fullName,
    email,
    branchNumber,
    fullAccountNumber: `${accountNumber}-${accountNumberDigit}`,
    availableBalance
});