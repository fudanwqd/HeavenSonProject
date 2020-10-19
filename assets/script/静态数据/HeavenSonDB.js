

var HeavenSonDemo = cc.Class({
    name : '天道之子模板',
    properties :{
        name : cc.String,
        heavenSonId : cc.Integer,
        type : cc.Integer,//门派
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
