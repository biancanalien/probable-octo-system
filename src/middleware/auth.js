import bankingAccountService from '../api/account/service';

export const checkBankingAccount = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    const currentToken = req.headers['authorization'];

    if (!currentToken) {
        return res.status(403).send('No token provided');
    }

    const fullAccountNumber = validateToken(currentToken);

    if (!fullAccountNumber) {
        return res.status(403).send('User has no permission');
    }

    const currentBankingAccount = await bankingAccountService.getBankingAccount(fullAccountNumber);

    if (!currentBankingAccount) {
        return res.status(403).send('User has no permission');
    }

    res.locals.currentBankingAccount = currentBankingAccount;

    next();
}

const validateToken = token => {
    const tokenArr = token.split('&');
    return tokenArr && tokenArr.length == 3 ? tokenArr[1] : null;
}