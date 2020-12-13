// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    init(son){
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;

        this.showCtr = cc.find("Canvas/右侧渲染区域").getComponent("3_show");

        this.heavenSonPNode= this.node.getChildByName("立绘");
        this.nameNode =this.node.getChildByName("姓名");

        this.heavenSon = son;

        // sf = this.sfManager.staticImages[son.heavenSonDemo.heavenSonDemoId]; 不用sf管理，用主界面的数据
        sf = son.heavenSonDemo.staticImage;
        this.heavenSonPNode.getComponent(cc.Sprite).spriteFrame = sf;
        this.nameNode.getComponent(cc.Label).string = son.name;

        this.node.on('touchstart', this.touch, this);//监听点击
    },

    touch(){
        //显示弹窗
        this.showCtr.showHeavonSonDetails(this.heavenSon);
    }


    // update (dt) {},
});
