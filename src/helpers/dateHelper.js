export const currentDate = () => {
    return Date.now();
}

export const formatToBRDateString = date => {
    return date.toLocaleString("pt-BR");
}