// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //主显示控制脚本的节点
        showCtrNode:{
            default:null,
            type:cc.Node
         },
         //文字显示节点
         textNode:{
            default:null,
            type:cc.Node
         },
         //灵宝获得基础概率
         baseP: {
            default : 0.2,
            type : cc.Float,
        },
        //灵宝获得同世界的附加概率
        sameWorldP: {
            default : 0.2,
            type : cc.Float,
        },
        //每次历练天道获得的灵石
        everyStones: {
            default : 100,
            type : cc.Integer,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //渲染并显示当前界面
    showHarvestWin () {
        this.mainCtr = this.showCtrNode.getComponent("2_showControl");
        this.heavenSon = this.mainCtr.currentSlot.heavenSon;//获得当前历练结束的正在收获的天道之子heavenSon
        text = this.harvest();//根据当前世界的灵宝和天道之子的属性，随机给一些奖励
        this.textNode.getComponent(cc.Label).string = text;//更改文字label
        this.mainCtr.deleteStartTime(this.heavenSon.heavenSonId);//删除条目
        this.mainCtr.currentSlot.setEmpty();//插槽为空
        this.node.active = true;
    },

    //根据当前世界的灵宝和天道之子的属性，随机给一些奖励
    harvest(){
        //this.mainCtr,this.heavenSon按理已经有了

        text = "获得天道之子某某获得"
        //灵宝部分
        //获得当前界的所有灵宝
        currentWorldTs = this.getCurrentTs();
        //随机奖励算法： 最终概率 = 基础概率+增加概率（同属性、天道之子资质（暂不考虑））
        addP = 0;
        if(this.heavenSon.heavenSonDemo.worldType == this.mainCtr.userData.currentWorld){
            addP = this.sameWorldP;
        }
        P = this.baseP + addP;
        if(P>1){
            P = 1;
        }
        //获得[0,1）的随机数
        randomNum =Math.random(); 
        if(randomNum<=P){//获得灵宝
            let tN = currentWorldTs.length;
            i = Math.floor(Math.random()*tN);    // 可均衡获取 0 到 tN-1 的随机整数
            treasure = currentWorldTs[i];
            //将灵宝给天道之子
            this.heavenSon.ownTreasure.push(treasure);
            //将灵宝从天道库里删除
            this.mainCtr.userData.deleteTreasure(treasure.treasureId);
            text+=" 灵宝"+treasure.name+" x1、";
        }

        //修为部分 保底10%+资质加成（每点资质+5%）
        exp = this.heavenSonlevel*(0.1+this.heavenSon.heavenSonDemo.quality*0.05)*this.mainCtr.userData.expBase;
        ifUplevel = false;
        newExp = exp+this.heavenSon.exp ;
        //是否到达上限
        upExp = this.heavenSonlevel*this.mainCtr.userData.expBase;
        if(newExp>=upExp){
            this.heavenSon.exp = newExp - upExp;
            if(this.heavenSon.level>=this.mainCtr.userData.maxLevel){
                this.heavenSon.level = this.mainCtr.userData.maxLevel;
                text+="已是此界最强，无法获得更多修为"
            }else{
                this.heavenSon.level++;//升级
                text+="修为x"+newExp+",恭喜成功突破!";
            }
        }else{
            this.heavenSon.exp += newExp; 
            text+="修为x"+newExp+",距离突破指日可待~";
        }
        //更改天道之子信息，并存储
        this.mainCtr.userData.changeChild(this.heavenSon);
        this.mainCtr.userData.stoneNum+=this.everyStones;
        this.mainCtr.userData.setData("stoneNum",this.mainCtr.userData.stoneNum);
        return text+"\n天道获得灵石x"+this.everyStones;
    },

    //关闭收获弹窗
    closeHarvestWin(){
        this.node.active = false;

    },

    //获得当前界的所有灵宝
    getCurrentTs(){
        allTreasures = this.mainCtr.userData.treasures;
        currentWorldTs = [];
        for(let i=0;i<allTreasures.length;i++){
            treasure = allTreasures[i];
            if(treasure.treasureDemo.type == this.mainCtr.userData.currentWorld){
                currentWorldTs.push(treasure);
            }
        }
        return currentWorldTs;
    }

    // update (dt) {},
});
