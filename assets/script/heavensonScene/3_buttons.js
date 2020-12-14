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
        this.bgmManager = cc.find("Canvas/BGMManager").getComponent("3_bgmManager");
        this.showCtr = cc.find("Canvas/右侧渲染区域").getComponent("3_show");
    },

    changeScenegetHeavenSon(){
        this.bgmManager.playBtnClickM();
        cc.director.loadScene("getHeavenSonScene");
    },

    returnMainScene(){
        this.bgmManager.playBtnClickM();
        cc.director.loadScene("mainScene");
    },

    clearData(){
        this.bgmManager.playBtnClickM();
        cc.sys.localStorage.removeItem("heavenSons");
        cc.sys.localStorage.removeItem("treasures");
        cc.sys.localStorage.removeItem("treasuresInWorld");
        cc.sys.localStorage.removeItem("stoneNum");
        cc.sys.localStorage.removeItem("hmzqNum");

    },

    setFightSon(){
        this.bgmManager.playBtnClickM();
        id = this.showCtr.detailSon.heavenSonId;
        this.showCtr.userData.setFighterID(id);
    },

    closeDetailWin(){
        this.bgmManager.playBtnClickM();
        this.showCtr.heavenSonDetailsNode.active = false;
    }

    // update (dt) {},
});
