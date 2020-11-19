export const getRandom = (minNum: Number, maxNum: Number, isInt: boolean) => {
    let num = Math.random() * (maxNum - minNum + 1) + minNum;
    return isInt ? parseInt(num, 10) : num;
}

export const getDesignResolutionSize = () => {
    return cc.view.getDesignResolutionSize();
}

export const checkOutScreen = (position) => {
    const size = getDesignResolutionSize();
    return position.x < -size.width / 2 || position.x > size.width || position.y < -size.height / 2 || position.y > size.height / 2
}