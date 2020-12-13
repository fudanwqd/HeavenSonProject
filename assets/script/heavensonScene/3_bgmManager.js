// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // 按钮音效资源
        btnAudio: {
            default: null,
            type: cc.AudioClip
        },
        // 背景音效资源
        bgmAudio: {
            default: null,
            type: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.playBGM();
    },

    playBtnClickM() {
        cc.audioEngine.playEffect(this.btnAudio, false);
    },

    playBGM(){
        cc.audioEngine.playEffect(this.bgmAudio, true);
    },
    // update (dt) {},
});
