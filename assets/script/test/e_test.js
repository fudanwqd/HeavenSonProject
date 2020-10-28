// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        this.heavenSonDB = cc.find("天道之子s").getComponent("HeavenSonDB");
    },

    start () {

        // this.deleteSonsInStorage();
        this.initSons();
    },

    deleteSonsInStorage(){
        cc.sys.localStorage.removeItem("heavenSons");
        //..
    },

    initSons(){
        sonsDB = this.heavenSonDB.sons;
        for(let i=0;i<sonsDB.length;i++){
            son ={};
            son.heavenSonDemo = sonsDB[i];
            son.name = son.heavenSonDemo.name;
            son.heavenSonId = this.userData.sons.length;
            son.level = 1;
            son.exp=0;
            son.power = son.heavenSonDemo.minPower;
            son.defend = son.heavenSonDemo.minDefend;
            son.HP =son.heavenSonDemo.HP;
            son.ownTreasure = [];
            son.staticImage = son.heavenSonDemo.staticImage;
            son.e_headPortrait = son.heavenSonDemo.e_headPortrait;
            this.userData.addNewChild(son);
        }
        
    }
    // update (dt) {},
});
