// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { checkOutScreen } from "../utils/index";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    gameControllerSprite: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // this.node.active = false;
    }

    update(dt) {

    }

    init(showTime, speed, moveX, moveY, destroyBullet) {
        let node = this.node;
        this.destroyBullet = destroyBullet;
        this.scheduleOnce(() => {
            node.active = true;
            cc.tween(node).by(1 / speed, { position: cc.v2(moveX, moveY) }).repeatForever().start();
        }, showTime);
    }

    checkOutScreen() {
        if (checkOutScreen(this.node.position) && this.destroyBullet) {
            this.destroyBullet(this.node);
        }
    }
}
