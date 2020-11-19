// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    bulletPrefab: cc.Prefab = null;

    @property(cc.Node)
    boss: cc.Node = null;

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

    makeBullet(bossPosition, parentNode) {
        this.makeBulletTypeA(bossPosition, parentNode);
    }

    makeBulletTypeA(bossPosition, parentNode) {
        const direction = 360;
        const rate = 10;
        const times = 2;
        const bulletSpeed = 10;
        const bulletMoveDis = 50;

        for (let i = 0; i < times; i++) {
            for (let j = 0; j < direction; j += rate) {
                let bullet = null;
                if (this._bulletPool.size() > 0) {
                    bullet = this._bulletPool.get();
                } else {
                    bullet = cc.instantiate(this.bulletPrefab);
                }
                bullet.position = bossPosition;
                bullet.parent = parentNode;
                const bulletMoveX = Math.sin((j + 90) * Math.PI / 180) * bulletMoveDis;
                const bulletMoveY = Math.cos((j + 90) * Math.PI / 180) * bulletMoveDis;
                bullet.getComponent("Bullet").init((i * direction + j) / direction, bulletSpeed, bulletMoveX, bulletMoveY, this.destroyBullet);
            }
        }
    }

    destroyBullet(bullet) {
        this._bulletPool.put(bullet);
    }
}
