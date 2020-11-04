// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        btnAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    onLoad(){
        cc.game.addPersistRootNode(this.node);
    },

    click: function () {
        this.current = cc.audioEngine.play(this.btnAudio, false, 0.8);
    },

    onDestroy: function () {
        cc.audioEngine.stop(this.current);
    }


});
