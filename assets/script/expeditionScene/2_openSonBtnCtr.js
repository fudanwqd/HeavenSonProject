// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //选择天道之子弹窗节点
        chooseSonWindowNode:{
            default:null,
            type:cc.Node
         }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.chooseCtr = this.chooseSonWindowNode.getComponent("2_chooseSonBtnCtr");
        this.bgmManager = cc.find("bgmManager").getComponent("2_bgmManager");
    },

    //点击按钮显示弹窗，弹窗打开后禁用下层的背景捕捉（不是子节点应该不会影响下层）
    click() {
        this.bgmManager.playBtnClickM();//playBGM()
        this.chooseSonWindowNode.active = true;
        this.chooseCtr.showRight("全部");
    },

    // update (dt) {},
});
