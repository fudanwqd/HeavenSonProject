// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        this.flushStoneAndHmzqNum();
     },

     flushStoneAndHmzqNum(){
        var stoneNum  = this.userData.getStoneNum();
        var hmzqNum = this.userData.getHmzqNum();
        var stoneNumNode = this.node.getChildByName("灵石数量");
        var hmzqNumNode = this.node.getChildByName("鸿蒙之气数量");
        stoneNumNode.getComponent(cc.Label).string = stoneNum;
        hmzqNumNode.getComponent(cc.Label).string = hmzqNum;
     },
    start () {

    },

    // update (dt) {},
});
