export const parseAccountBanking = ({ fullName, email }, { branchNumber, accountNumber, accountNumberDigit, avaliableBalance }) => ({
    fullName,
    email,
    branchNumber,
    fullAccountNumber: `${accountNumber}-${accountNumberDigit}`,
    avaliableBalance
});