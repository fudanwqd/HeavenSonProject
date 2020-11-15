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
        comfirmNode: {
            default:null,
            type: cc.Node
        },
        fightNameNode: {
            default:null,
            type: cc.Node
        },
        mijingNode: {
            default:null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.game.onLoad();
        this.userData = this.game.userData;

        this.comfirmNode.active = false;
        this.fightSon = this.userData.getChildByID(this.userData.fighterID);
        console.log(this.userData.fighterID);
        console.log(this.fightSon);
        this.fightName = this.fightNameNode.getComponent(cc.Label);
        this.fightName.string = '"' +this.fightSon.name+'"';

        cc.director.preloadScene("fightScene", function(){
            cc.log("fightScene preloaded");
        })
     },

     changeSceneFight(){
        this.comfirmNode.active = true;
        this.mijingName = this.mijingNode.getComponent(cc.Label);
        this.mijingName.string = '太虚幻境';
    },

    confirmSceneChange(){
        cc.log("应该切换到场景：fight");
        cc.director.loadScene("fightScene");
    },

    cancelSceneChange(){
        this.comfirmNode.active = false;
    }

    // update (dt) {},
});
