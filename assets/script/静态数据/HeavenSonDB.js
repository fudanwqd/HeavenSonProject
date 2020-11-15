



cc.Class({
    extends: cc.Component,

    properties: {
        sons : {
            default : [],
            type : [require("HeavenSonDemo")]
        }
    },

    getSonNum(){
        return this.sons.length;
    },

    onLoad(){
        // // 常驻节点  不写的话，虽然通过game能调用函数和静态值，但是sons这种就没有了(root才能常驻)
        cc.game.addPersistRootNode(this.node);
    },


    start () {

    },

});
