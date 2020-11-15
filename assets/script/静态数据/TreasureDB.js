
cc.Class({
    extends: cc.Component,

    properties: {
      treasures :{
          default : [],
          type : [require("TreasureDemo")]
      }
    },

    getMonsterNum(){
        return this.treasures.length;
    },

    start () {

    },

    onLoad(){
        // // 常驻节点  不写的话，虽然通过game能调用函数和静态值，但是sons这种就没有了(root才能常驻)
        cc.game.addPersistRootNode(this.node);
    },

    // update (dt) {},
});
