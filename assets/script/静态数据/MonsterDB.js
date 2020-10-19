
var Monster = cc.Class({
    name : "怪物",
    properties : {
        name : cc.String,
        monsterId : cc.Integer,
        type : cc.Integer,//门派
        power : cc.Integer,
        defend: cc.Integer,
        HP : cc.Integer,
        quality : cc.Integer
    }
})

cc.Class({
    extends: cc.Component,

    properties: {
        monsters : {
            default : [],
            type : [Monster]
        }
    },

    getMonsterNum(){
        return this.monsters.length;
    },

    start () {

    },

    // update (dt) {},
});
