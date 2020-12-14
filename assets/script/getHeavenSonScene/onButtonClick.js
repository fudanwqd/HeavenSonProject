// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        stonePossibleArray : {
            default : [],
            type : [cc.Integer]
        },

        HMZQPossibleArray : {
            default : [],
            type : [cc.Integer]
        }
      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        this.heavenSonDB = this.game.HeavenSonDB;
        this.loadPossiblities();
        // this.showSuccessPopUp(null);
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
            // 刷新页面灵石鸿蒙之气展示
            cc.find("Canvas/抽卡界面/灵石鸿蒙之气底图").getComponent("stoneAndHmzqOnload").flushStoneAndHmzqNum();
    
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
            var newHeavenSonDemoId = this.getHMZQRandomDemoId();
            var newHeavenSon =  this.userData.createNewHeavenSonByDemoID(newHeavenSonDemoId);
            newHeavenSon.name = newHeavenSon.heavenSonDemo.name;
            this.userData.addNewChild(newHeavenSon);
             // 刷新页面灵石鸿蒙之气展示
             cc.find("Canvas/抽卡界面/灵石鸿蒙之气底图").getComponent("stoneAndHmzqOnload").flushStoneAndHmzqNum(); 
              // 抽卡成功，弹出抽卡成功弹窗
            this.showSuccessPopUp(newHeavenSon);
        }

    },
    // 弹出抽卡成功弹窗
    showSuccessPopUp(heavenSon){
        // alert("抽卡成功弹窗");
        var successPopUpNode = cc.find("Canvas/抽卡成功弹窗");
        var subNode = successPopUpNode.getChildByName("抽卡展示弹窗");
        var SuccessDiscriptionNode = subNode.getChildByName("成功描述");
        var getHeavenSonNode = subNode.getChildByName("抽到的天道之子");
        var propertyDescription = subNode.getChildByName("属性描述");
        var successStr = "恭喜你！抽到了"+heavenSon.heavenSonDemo.name+"角色!";
        SuccessDiscriptionNode.getComponent(cc.Label).string = successStr;
        // 将抽到的天道之子的立绘放在展位图中

        var image  =  heavenSon.heavenSonDemo.staticImage;

        getHeavenSonNode.getComponent(cc.Sprite).spriteFrame = image;
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
        failedPopUp.active = false;
    },

    //抽卡成功界面弹窗关闭按钮
    OnSuccessButtonOffClick: function(event,customEventData){
        var successPopUp = cc.find("Canvas/抽卡成功弹窗");
        successPopUp.active = false;
    },

    loadPossiblities(){
        var totalNum  = this.heavenSonDB.sons.length;
         var maxQuality = 10;
         var stoneBegin = 1;// 去除龙傲天
         var stoneEnd = totalNum;
         var hmzqBegin = 0;
         var hmzqEnd = totalNum-1;
         var stonePossib = [];
         var hmzqPossib = [];
         var temp = 0;
         for(var i =stoneBegin;i<stoneEnd;i++){
            temp+= maxQuality - this.heavenSonDB.sons[i].quality;
            stonePossib.push(temp);
        }
        temp = 0;
        for(var i =hmzqBegin;i<hmzqEnd;i++){
            temp+= maxQuality - this.heavenSonDB.sons[i].quality;
            hmzqPossib.push(temp);
        }

        this.stonePossibleArray = stonePossib;
        this.HMZQPossibleArray = hmzqPossib;
    },

    
    getStoneRandomDemoId(){
        // 该方法实现用灵石抽卡的基本策略，该策略应当与天道之子的稀有性进行概率的分配
        // 暂定为龙傲天为稀有卡组
        var totalNum  = this.heavenSonDB.sons.length;
        var stoneBegin = 1;// 去除龙傲天
        var stoneEnd = totalNum;
        var max = this.stonePossibleArray[this.stonePossibleArray.length-1]; 
        var randomNum =  Math.random()*max;
        var getIndex = 0;
        for(var i=0;i<this.stonePossibleArray.length;i++){
            if(randomNum<this.stonePossibleArray[i]){
                getIndex = i;
                break;
            }
        }
        return stoneBegin+getIndex;
        
    },

    getHMZQRandomDemoId(){
        var totalNum  = this.heavenSonDB.sons.length;
        var hmzqBegin = 0;
        var hmzqEnd = totalNum-1;

        var max = this.HMZQPossibleArray[this.HMZQPossibleArray.length-1]; 
        var randomNum =  Math.random()*max;
        var getIndex = 0;
        for(var i=0;i<this.HMZQPossibleArray.length;i++){
            if(randomNum<this.HMZQPossibleArray[i]){
                getIndex = i;
                break;
            }
        }
        return hmzqBegin+getIndex;
    }
    // update (dt) {},
});
