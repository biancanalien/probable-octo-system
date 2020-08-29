export const formatToBRMoney = value => {
    try {
        return `R$ ${value.toFixed(2)}`;
    } catch (e) {
        console.log(e, value);
        return `R$ ${value}`;
    }
};

export const transformToNumber = value => {
    return parseFloat(value);
}