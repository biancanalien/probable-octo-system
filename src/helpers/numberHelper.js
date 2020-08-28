export const formatToBRMoney = value => {
    return new Intl.NumberFormat("pt-BR",  {
        style: 'currency',
        currency: "BRL"
    }).format(value);
};