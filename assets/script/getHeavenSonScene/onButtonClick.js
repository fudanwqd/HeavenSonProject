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

    onLoad () {
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        this.showSuccessPopUp(null);
    },

    start () {

    },

    onStoneButtonClick: function(event, customEventData){
        // 灵石抽卡
        // 该抽卡逻辑为消耗一部分灵石，并将获得一个随机的天道之子,customEventData 为消耗的灵石数量
        // for test
        // cc.log("灵石抽卡！");
        // alert("灵石！");
        var stoneNum = this.userData.getStoneNum();
        if(stoneNum<customEventData){
            // 灵石不足以抽卡，返回失败弹窗
            this.showFailedPopUp("灵石");
        }else{
            //更新玩家手中灵石数量
            this.userData.setStoneNum(stoneNum-customEventData);
            var newHeavenSonDemoId =  this.getStoneRandomDemoId();
            var newHeavenSon =  this.userData.createNewHeavenSonByDemoID(newHeavenSonDemoId);
            this.userData.addNewChild(newHeavenSon);
            // 抽卡成功，弹出抽卡成功弹窗
            this.showSuccessPopUp(newHeavenSon);

        }

    },



    onHMZQButtonClick:function(event,customEventData){
        //鸿蒙之气抽卡
        // 该抽卡逻辑为消耗一部分鸿蒙之气，并将获得一个随机的天道之子
        //for test
        // cc.log("鸿蒙之气抽卡！");
        // alert("鸿蒙之气！");
        var hmzqNum  = this.userData.getHmzqNum();
        if(hmzqNum<customEventData){
            // 鸿蒙之气不足以抽卡，返回失败弹窗
            this.showFailedPopUp("鸿蒙之气");
        }else{
            //更新玩家手中鸿蒙之气数量
            this.userData.setHmzqNum(hmzqNum-customEventData);
            var newHeavenSonDemoId = this.getStoneRandomDemoId();
            var newHeavenSon =  this.userData.createNewHeavenSonByDemoID(newHeavenSonDemoId);
            this.userData.addNewChild(newHeavenSon);
            // 抽卡成功，弹出抽卡成功弹窗
            this.showSuccessPopUp(newHeavenSon);
        }

    },
    // 弹出抽卡成功弹窗
    showSuccessPopUp(heavenSon){
        var successPopUpNode = cc.find("Canvas/抽卡成功弹窗");
        var subNode = successPopUpNode.getChildByName("抽卡展示弹窗");
        var SuccessDiscriptionNode = subNode.getChildByName("成功描述");
        var getHeavenSonNode = subNode.getChildByName("抽到的天道之子");
        var propertyDescription = subNode.getChildByName("属性描述");
        var successStr = "恭喜你！抽到了"+heavenSon.heavenSonDemo.name+"角色!";
        SuccessDiscriptionNode.getComponent(cc.Label).string = successStr;
        // 将抽到的天道之子的立绘放在展位图中
        getHeavenSonNode.getComponent(cc.Sprite).spriteFrame = heavenSon.heavenSonDemo.staticImage;
        var descriptionStr = "名称 ： "+ heavenSon.heavenSonDemo.name+
        "  门派 ："+heavenSon.heavenSonDemo.worldType+
        "\n\n 攻击力 ："+heavenSon.power+
        "   防御力 ："+heavenSon.defend+
        "\n\n血量 ： "+heavenSon.HP+
        "    成长率 ： "+heavenSon.growRate;
        propertyDescription.getComponent(cc.Label).string = descriptionStr;
        // 弹出弹窗
        successPopUpNode.active  = true;
    },

    // 显示抽卡失败弹窗
    showFailedPopUp(str){
        var failedPopUpNode = cc.find("Canvas/抽卡失败弹窗");
        var failedDescription = failedPopUpNode.getChildByName("抽卡失败描述");
        var inputStr = "抱歉！您的"+str+"不足！无法抽卡！"

        failedPopUpNode.active = true;
    },
    //抽卡失败界面弹窗关闭按钮
    onFailedButtonOffClick:function(event,customEventData){
        var failedPopUp = cc.find("Canvas/抽卡失败弹窗");
        this.failedPopUp.active = false;
    },

    //抽卡成功界面弹窗关闭按钮
    OnSuccessButtonOffClick: function(event,customEventData){
        var successPopUp = cc.find("Canvas/抽卡成功弹窗");
        this.failedPopUp.active = false;
    },



    
    getStoneRandomDemoId(){
        // 该方法实现用灵石抽卡的基本策略，该策略应当与天道之子的稀有性进行概率的分配
    },

    getHMZQRandomDemoId(){

    }
    // update (dt) {},
});
