// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//太虚幻境切换脚本
cc.Class({
    extends: cc.Component,

    properties: {
        // comfirmNode: {
        //     default:null,
        //     type: cc.Node
        // },
        // fightNameNode: {
        //     default:null,
        //     type: cc.Node
        // },
        // fightNameNode: {
        //     default:null,
        //     type: cc.Node
        // },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        // this.game = cc.find("game").getComponent("game");//game节点的game脚本
        // this.game.onLoad();
        // this.userData = this.game.userData;
        this.userData = cc.find("用户数据").getComponent("userData");//js脚本

        this.comfirmNode = cc.find("Canvas/确认弹窗");
        // this.fightNameNode = cc.find("Canvas/确认弹窗/战斗人物名字");
        this.mijingNode = cc.find("Canvas/确认弹窗/秘境名字");

        // this.fightSon = this.userData.getChildByID(this.userData.fighterID);
        
        // this.fightName = this.fightNameNode.getComponent(cc.Label);
        // this.fightName.string = '"' +this.fightSon.heavenSonDemo.name+'"';

        // this.stoneNumberNode = cc.find("")
        // this.stoneNumber = this.stoneNumberNode.getComponent(cc.RichText);
        // this.stoneNumber.string = "<color=#80aec2>" + this.userData.stoneNum + "</color>";

        cc.director.preloadScene("fightScene", function(){
            cc.log("fightScene preloaded");
        })

        cc.game.addPersistRootNode(this.comfirmNode);
     },

     changeTaiXuSceneFight(){
        this.comfirmNode.active = true;
        this.mijingName = this.mijingNode.getComponent(cc.Label);
        this.mijingName.string = '太虚幻境';
    },

    confirmSceneChange(){
        cc.log("应该切换到场景：fight");
        cc.director.loadScene("fightScene");
    },

    changeSouthSceneFight(){
        this.comfirmNode.active = true;
        this.mijingName = this.mijingNode.getComponent(cc.Label);
        this.mijingName.string = '南海秘境';
    },

    changeJianMuSceneFight(){
        this.comfirmNode.active = true;
        this.mijingName = this.mijingNode.getComponent(cc.Label);
        this.mijingName.string = '建木仙境';
    },

    cancelSceneChange(){
        this.comfirmNode.active = false;
    }

    // update (dt) {},
});
