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
        }else{
            //更新玩家手中灵石数量
            this.userData.setStoneNum(stoneNum-customEventData);
            var newHeavenSonDemoId =  this.getStoneRandomDemoId();
            var newHeavenSon =  this.userData.createNewHeavenSonByDemoID(newHeavenSonDemoId);
            this.userData.addNewChild(newHeavenSon);
            // 抽卡成功，弹出抽卡成功弹窗


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
        }else{
            //更新玩家手中鸿蒙之气数量
            this.userData.setHmzqNum(hmzqNum-customEventData);
            var newHeavenSonDemoId = this.getStoneRandomDemoId();
            var newHeavenSon =  this.userData.createNewHeavenSonByDemoID(newHeavenSonDemoId);
            this.userData.addNewChild(newHeavenSon);
            // 抽卡成功，弹出抽卡成功弹窗
        }

    },



    
    getStoneRandomDemoId(){
        // 该方法实现用灵石抽卡的基本策略，该策略应当与天道之子的稀有性进行概率的分配
    },

    getHMZQRandomDemoId(){

    }
    // update (dt) {},
});
