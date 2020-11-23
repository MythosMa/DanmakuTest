let designResolutionSize = null;

export const getRandom = (minNum: Number, maxNum: Number, isInt: boolean) => {
    let num = Math.random() * (maxNum - minNum + 1) + minNum;
    return isInt ? parseInt(num, 10) : num;
}


export const getDesignResolutionSize = () => {
    if (!this.designResolutionSize) {
        this.designResolutionSize = cc.view.getDesignResolutionSize();
    }
    return this.designResolutionSize;
}

export const checkOutScreen = (position) => {
    const size = getDesignResolutionSize();
    return position.x < -size.width / 2 || position.x > size.width || position.y < -size.height / 2 || position.y > size.height / 2
}