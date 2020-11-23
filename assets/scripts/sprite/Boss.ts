import { Integer, Vec2 } from './../../../creator.d';
import { getRandom } from "../utils/index";
import { danmakus } from "../../danmaku/danmaku";


// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

enum DanmakuType {
    TYPE_A
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    gameControllerSprite: cc.Node = null;

    @property({
        type: cc.Enum(DanmakuType)
    })
    danmakuType: DanmakuType = DanmakuType.TYPE_A

    @property
    _bossInitPosition: cc.Vec2 = null;
    _bossMoveRangeX: cc.Integer[] = [];
    _bossMoveRangeY: cc.Integer[] = [];
    _changePositionTime = 0;
    _changeBulletTime = 0;
    _moveTime = 0.5;
    _moveInterval = [3, 6];
    _bulletInterval = [1, 3];
    _danmaku = [];
    _danmakuCount = 0;
    _danmakuIndex = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._bossInitPosition = cc.v2(0, cc.view.getDesignResolutionSize().height / 4);
        this._bossMoveRangeX = [cc.view.getDesignResolutionSize().width * -0.5 + this.node.width * 1.2, cc.view.getDesignResolutionSize().width * 0.5 - this.node.width * 1.2];
        this._bossMoveRangeY = [cc.view.getDesignResolutionSize().height * 0.2 + this.node.height * 1.2, cc.view.getDesignResolutionSize().height * 0.4 - this.node.height * 1.2];
        this.node.x = this._bossInitPosition.x;
        this.node.y = this._bossInitPosition.y;

        this._danmaku = danmakus()[this.danmakuType].danmakus;
        this._danmakuCount = this._danmaku.length;
        this._danmakuIndex = 0;
    }

    start() {

    }

    checkChangePositionTime(dt) {
        if (this._changePositionTime <= 0) {
            let targetX = getRandom(this._bossMoveRangeX[0], this._bossMoveRangeX[1], true);
            let targetY = getRandom(this._bossMoveRangeY[0], this._bossMoveRangeY[1], true);
            let bullets = this._danmaku[this._danmakuIndex++].bullets;
            if (this._danmakuIndex >= this._danmakuCount) {
                this._danmakuIndex = 0;
            }
            cc.tween(this.node).to(this._moveTime, { position: cc.v2(targetX, targetY) }).call(() => { this.gameControllerSprite.getComponent("GameController").makeBullet(this.node.position, this.node.parent, bullets); }).start();

            this._changePositionTime = getRandom(this._moveInterval[0], this._moveInterval[1], true);
        }
        this._changePositionTime -= dt;
    }

    checkBulletTime(dt) {
        if (this._changeBulletTime <= 0) {
            let bullets = this._danmaku[this._danmakuIndex++].bullets;
            if (this._danmakuIndex >= this._danmakuCount) {
                this._danmakuIndex = 0;
            }
            this.gameControllerSprite.getComponent("GameController").makeBullet(this.node.position, this.node.parent, bullets);
            this._changeBulletTime = getRandom(this._bulletInterval[0], this._bulletInterval[1], true);
        }
        this._changeBulletTime -= dt;
    }

    update(dt) {
        this.checkChangePositionTime(dt);
        // this.checkBulletTime(dt);
    }
}
