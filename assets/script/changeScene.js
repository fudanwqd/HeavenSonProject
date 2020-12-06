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
        //可以预加载的场景
        cc.director.preloadScene("expedition", function () {
            cc.log("expedition scene preloaded");
        });
    },

    changeSceneExpedition () {
        cc.log("应该切换到场景：抽卡场景");
        cc.director.loadScene("getHeavenSonScene");
    },

    changeFightScene () {
        cc.log("应该切换到场景：战斗场景");
        cc.director.loadScene("fightScene");
    },

    changeMainScene(){
        cc.log("应该切换到场景：主场景");
        cc.director.loadScene("mainScene");
    }, 
    changeSceneMain () {
        cc.log("应该切换到场景：主场景");
        cc.director.loadScene("mainScene");
    },

    changeSceneExper() {
        cc.log("应该切换到场景：历练");
        cc.director.loadScene("expedition");
    },
    


    removeAllStorage(){
        cc.sys.localStorage.clear();
        
    }





    // update (dt) {},
});
