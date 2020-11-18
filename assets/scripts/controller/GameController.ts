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

    makeBullet(bossPosition){
        console.log("makeBullet=============");
        console.log(bossPosition);
        console.log("makeBullet=============");
    }
}
