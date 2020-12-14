// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        stoneNumberNode: {
            default:null,
            type: cc.Node
        },
        hmzqNumberNode: {
            default:null,
            type: cc.Node
        },
        roleNameNode: {
            default:null,
            type: cc.Node
        },
        currentExpeNode: {
            default:null,
            type: cc.Node
        },
        currentLevelNode: {
            default:null,
            type: cc.Node
        },
        progressBarNode: {
            default:null,
            type: cc.Node
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.game = cc.find("game").getComponent("game");//game节点的game脚本
        // this.game.onLoad();
        // this.userData = this.game.userData;
        // // this.userData.onLoad();
        cc.sys.localStorage.removeItem("heavenSons");//treasures
        cc.sys.localStorage.removeItem("treasures");
        this.userData = cc.find("用户数据").getComponent("userData");//js脚本
        // console.log(this.stoneNumber);
        this.stoneNumber = this.stoneNumberNode.getComponent(cc.RichText);
        this.stoneNumber.string = "<color=#80aec2>" + this.userData.stoneNum + "</color>";
        
        this.hmzqNumber = this.hmzqNumberNode.getComponent(cc.RichText);
        this.hmzqNumber.string = "<color=#80aec2>" + this.userData.hmzqNum + "</color>";
        
        this.fightSon = this.userData.getChildByID(this.userData.fighterID);
        // console.log(this.userData.fighterID);
        // console.log(this.fightSon);
        this.roleName = this.roleNameNode.getComponent(cc.RichText);

        this.roleName.string = "<color=#80aec2>名字：" + this.fightSon.name + "</color>";

        this.currentExpe = this.currentExpeNode.getComponent(cc.RichText);
        this.currentExpe.string = "<color=#80aec2>" + this.fightSon.exp + " /</color>";

        this.upgradeExpe = cc.find("Canvas/头像/战斗人物圆框/progressBar/升级所需经验").getComponent(cc.RichText);
        this.upgradeExpe.string = "<color=#80aec2>" + this.fightSon.level *100 + "</color>";

        this.currentLevel = this.currentLevelNode.getComponent(cc.RichText);
        this.currentLevel.string = "<color=#80aec2>Lv." + this.fightSon.level + "</color>";

        this.headPortraitNode = cc.find("Canvas/头像/战斗人物占位图/人物头像");
        this.headPortrait = this.headPortraitNode.getComponent(cc.Sprite);
        this.headPortrait.spriteFrame = this.fightSon.heavenSonDemo.e_headPortrait;

        this.comfirmNode = cc.find("Canvas/确认弹窗");
        this.fightNameNode = cc.find("Canvas/确认弹窗/战斗人物名字");
        // this.mijingNode = cc.find("Canvas/确认弹窗/秘境名字");
        this.fightName = this.fightNameNode.getComponent(cc.Label);
        this.fightName.string = '"' +this.fightSon.heavenSonDemo.name+'"';

        //经验条进度实现
        this.progressNode = cc.find("Canvas/头像/战斗人物圆框/progressBar");
        this.prog = this.progressNode.getComponent(cc.ProgressBar);
        this.prog.progress = this.fightSon.exp/(this.fightSon.level *100);

    },

    start () {

    },

    update(){
        // this.stoneNumber.string = "<color=#80aec2>" + this.userData.stoneNum + "</color>";
        // this.hmzqNumber.string = "<color=#80aec2>" + this.userData.hmzqNum + "</color>";
        // this.currentExpe.string = "<color=#80aec2>" + this.fightSon.exp + " /</color>";
        // this.currentLevel.string = "<color=#80aec2>Lv." + this.fightSon.level + "</color>";
        // this.headPortrait = this.headPortraitNode.getComponent(cc.Sprite);
        // this.headPortrait.spriteFrame = this.fightSon.heavenSonDemo.staticImage;
        // this.fightName.string = '"' +this.fightSon.heavenSonDemo.name+'"';
        // //经验条进度实现
        // this.prog.progress = this.fightSon.exp / 100;
    }
});
