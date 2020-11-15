// this.bgmManager = cc.find("bgmManager").getComponent("2_bgmManager");
// this.bgmManager.playBtnClickM();//playBGM()


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

    // onLoad () {},

    playBtnClickM() {
        cc.audioEngine.playEffect(this.btnAudio, false);
    },

    playBGM(){
        cc.audioEngine.playEffect(this.bgmAudio, true);
    },

    // update (dt) {},
});
