export const getRandom = (minNum: Number, maxNum: Number, isInt: boolean) => {
    let num = Math.random() * (maxNum - minNum + 1) + minNum;
    return isInt ? parseInt(num, 10) : num;
}