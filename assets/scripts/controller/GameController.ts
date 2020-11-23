// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

enum Direction {
    CCW = 1,
    CW = 3
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Node)
    boss: cc.Node = null;

    @property
    degree = 360;

    @property({
        type: cc.Enum(Direction)
    })
    direction: Direction = Direction.CW;

    @property
    bulletSpace = 10;

    @property
    bulletTimeSpace = 10;

    @property
    times = 2;

    @property
    bulletSpeed = 10;

    @property
    bulletMoveDis = 50;

    @property
    _bulletPool: cc.NodePool = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._bulletPool = new cc.NodePool();
        let initCount = 2000;
        for (let i = 0; i < initCount; i++) {
            let bullet = cc.instantiate(this.bulletPrefab);
            this._bulletPool.put(bullet);
        }
    }

    start() {

    }

    // update (dt) {}

    makeBullet(bossPosition, parentNode, bullets) {
        // this.makeBulletTypeA(bossPosition, parentNode);
        for (let i = 0; i < bullets.length; i++) {
            let d = bullets[i];
            let bullet = null;
            if (this._bulletPool.size() > 0) {
                bullet = this._bulletPool.get();
            } else {
                bullet = cc.instantiate(this.bulletPrefab);
            }
            bullet.position = bossPosition;
            bullet.parent = parentNode;
            bullet.getComponent("Bullet").init(d.showTime, d.bulletSpeed, d.bulletMoveX, d.bulletMoveY, this.destroyBullet.bind(this));
        }
    }


    makeBulletTypeA(bossPosition, parentNode) {
        for (let i = 0; i < this.times; i++) {
            for (let j = 0; j < this.degree; j += this.bulletSpace) {
                let bullet = null;
                if (this._bulletPool.size() > 0) {
                    bullet = this._bulletPool.get();
                } else {
                    bullet = cc.instantiate(this.bulletPrefab);
                }
                bullet.position = bossPosition;
                bullet.parent = parentNode;
                const bulletMoveX = Math.sin((j + 90) * Math.PI / 180) * this.bulletMoveDis * (this.direction - 2);
                const bulletMoveY = Math.cos((j + 90) * Math.PI / 180) * this.bulletMoveDis * (this.direction - 2);
                bullet.getComponent("Bullet").init((i * this.degree + j) / (this.degree * this.bulletTimeSpace), this.bulletSpeed, bulletMoveX, bulletMoveY, this.destroyBullet.bind(this));
            }
        }
    }

    destroyBullet(bullet) {
        this._bulletPool.put(bullet);
    }
}
