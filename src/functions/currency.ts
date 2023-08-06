// truncate to 2 decimal places

export const currencyT = (value: number): number => {
    const calcDec = Math.pow(10, 2);
    return Math.trunc(value * calcDec) / calcDec;
}
