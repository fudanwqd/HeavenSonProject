// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

//查看天道之子
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene("getHeavenSonScene", function(){
            cc.log("getHeavenSonScene preloaded");
        })
     },

     changeSceneHeavenSon(){
        cc.log("应该切换到场景：getHeavenSonScene");
        cc.director.loadScene("getHeavenSonScene");
    },

    // update (dt) {},
});
