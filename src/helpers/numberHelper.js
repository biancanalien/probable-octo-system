export const formatToBRMoney = value => {
    return `R$ ${value.toFixed(2)}`;
}

export const transformToNumber = value => {
    return parseFloat(value);
}