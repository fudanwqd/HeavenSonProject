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

    // onLoad () {},

    start () {

    },

    init(treasure,canUse){
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        this.treasure = treasure;   
        var treasureImgNode = this.node.getChildByName("灵宝大图");
        var temp  = treasure.treasureDemo.staticImage;
        treasureImgNode.getComponent(cc.Sprite).spriteFrame = temp;
        if(!canUse){
            this.node.getChildByName("蒙层").active = true;
        }
        // 监听点击如何实现，touchStart 是什么

        this.node.on('touchstart', this.touch, this);//监听点击
    },

    // update (dt) {},
    touch(){
     //出现勾选框，并在右侧展示灵宝详细信息
        var checkBox = this.node.getChildByName("灵宝-勾选图");
        var mask = this.node.getChildByName("蒙层");
        if(!mask.active){
            checkBox.active = !checkBox.active;
        }
        

        this.displayTreasureDetails(this.treasure);
    },

    displayTreasureDetails(treasure){
        var detailNode = cc.find("Canvas/某界灵宝详情/灵宝详情");
        var detailImg = detailNode.getChildByName("灵宝具体介绍-灵宝大图");
        var detailName = detailNode.getChildByName("灵宝名称");
        var detailDescription = detailNode.getChildByName("灵宝属性");
        detailImg.getComponent(cc.Sprite).spriteFrame = treasure.treasureDemo.staticImage;
        detailName.getComponent(cc.Label).string = treasure.treasureDemo.name;
        var str = "攻击 ： "+treasure.power+"  防御 ： "+treasure.defend+"\n 血量 ：  "+treasure.HP;
        detailDescription.getComponent(cc.Label).string = str;  

    },

    removeFromWorld(){
        this.userData.deleteTreasureFromWorld(this.treasure,this.treasure.treasureDemo.type);
        // 在这个脚本中的treasure对象的更改会体现在userdata中嘛？
        // this.treasure.isInWorld = false;
        // 或者这样实现可以嘛？
        // this.node.destroy();
        this.userData.getTreasureByID(this.treasure.treasureId).isInWorld =false;
        this.userData.updateTreasure();
    },

    sendToWorld(){
        // this.node.destroy();
        this.userData.addTreasureToWorld(this.treasure,this.treasure.treasureDemo.type);
        // this.treasure.isInWorld = true;
        this.userData.getTreasureByID(this.treasure.treasureId).isInWorld =true;
        this.userData.updateTreasure();
    }

});
