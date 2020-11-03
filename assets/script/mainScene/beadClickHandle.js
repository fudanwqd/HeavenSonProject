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
        canvas: {
            default:null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    clickDevilHandle() {//点击魔界珠子
        var node = cc.find("Canvas/魔/魔界按钮/atom", canvas);
        var particle = node.active;
        cc.log();
        if(!particle){
            particle = true;
        }

        //cc.log("应该杀死所有粒子");
        // var devil =  cc.find("魔/魔界按钮/atom", this.node);
        // devil.active = true;
        //this.node.getChildByName("button 01").active = true;
        //this.node.active = false;
    },

    // update (dt) {},
});
