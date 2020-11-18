import { Integer, Vec2 } from './../../../creator.d';
import { getRandom } from "../utils/index";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    gameControllerSprite: cc.Node = null;

    @property
    _bossInitPosition: cc.Vec2 = null;
    _bossMoveRangeX: cc.Integer[] = [];
    _bossMoveRangeY: cc.Integer[] = [];
    _changePositionTime = 0;
    _changeBulletTime = 0;
    _moveTime = 0.5;
    _moveInterval = [3, 6];
    _bulletInterval = [1, 3];

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._bossInitPosition = cc.v2(0, cc.view.getDesignResolutionSize().height / 4);
        this._bossMoveRangeX = [cc.view.getDesignResolutionSize().width * -0.5 + this.node.width * 1.2, cc.view.getDesignResolutionSize().width * 0.5 - this.node.width * 1.2];
        this._bossMoveRangeY = [cc.view.getDesignResolutionSize().height * 0.2 + this.node.height * 1.2, cc.view.getDesignResolutionSize().height * 0.4 - this.node.height * 1.2];
        this.node.x = this._bossInitPosition.x;
        this.node.y = this._bossInitPosition.y;
    }

    start() {

    }

    checkChangePositionTime(dt) {
        if (this._changePositionTime <= 0) {
            let targetX = getRandom(this._bossMoveRangeX[0], this._bossMoveRangeX[1], true);
            let targetY = getRandom(this._bossMoveRangeY[0], this._bossMoveRangeY[1], true);
            cc.tween(this.node).to(this._moveTime, { position: cc.v2(targetX, targetY) }).start();

            this._changePositionTime = getRandom(this._moveInterval[0], this._moveInterval[1], true);
        }
        this._changePositionTime -= dt;
    }

    checkBulletTime(dt) {
        if (this._changeBulletTime <= 0) {
            this.gameControllerSprite.getComponent("GameController").makeBullet(this.node.position);
            this._changeBulletTime = getRandom(this._bulletInterval[0], this._bulletInterval[1], true);
        }
        this._changeBulletTime -= dt;
    }

    update(dt) {
        this.checkChangePositionTime(dt);
        this.checkBulletTime(dt);
    }
}
