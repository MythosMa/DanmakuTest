// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

enum Direction {
    RIGHT = 0,
    DOWNRIGHT,
    DOWN,
    DOWNLEFT,
    LEFT,
    LEFTUP,
    UP,
    UPRIGHT
}

const danmaku_type_circle = (degree, directon, bulletSpace, bulletTimeSpace, times, bulletSpeed, bulletMoveDis) => {
    let bullets = [];
    for (let i = 0; i < times; i++) {
        for (let j = 0; j < degree; j += bulletSpace) {
            const bulletMoveX = Math.sin((j + 90 + directon * 45) * Math.PI / 180) * bulletMoveDis;
            const bulletMoveY = Math.cos((j + 90 + directon * 45) * Math.PI / 180) * bulletMoveDis;
            const showTime = (i * degree + j) / (degree * bulletTimeSpace);
            bullets.push({
                bulletMoveX,
                bulletMoveY,
                showTime,
                bulletSpeed
            })
        }
    }

    let info = {
        type: "A",
        bullets,
    }
    return info
}

const danmaku_A = () => {
    let danmakuInfos = {
        time: 5,
        danmakus: [danmaku_type_circle(540, Direction.RIGHT, 10, 2, 1, 10, 50), danmaku_type_circle(360, Direction.DOWN, 10, 2, 1, 10, 50)]
    };

    return danmakuInfos;
}

export const danmakus = () => {
    return [danmaku_A()];
}
