

var HeavenSonDemo = cc.Class({
    name : '天道之子模板',
    properties :{
        name : cc.String,
        heavenSonDemoId : cc.Integer,//与其在sons数组的下标相同
        worldType : cc.String,//世界属性
        minPower : cc.Integer,
        maxPower : cc.Integer,
        minDefend: cc.Integer,
        maxDefend: cc.Integer,
        HP : cc.Integer,
        growRate : cc.Float,
        quality : cc.Integer,
        staticImage:{
            default:null,
            type: cc.SpriteFrame,
        },
        e_headPortrait:{
            default:null,
            type: cc.SpriteFrame,
        },
    }
}
);

cc.Class({
    extends: cc.Component,

    properties: {
        sons : {
            default : [],
            type : [HeavenSonDemo]
        }
    },

    getSonNum(){
        return this.sons.length;
    },


    start () {

    },

});
