var HeavenSon = cc.Class({
    name : '天道之子',
    properties :{
       name : cc.String,
       heavenSonId : cc.Integer,//身份识别唯一编码
       worldType : cc.String,//世界属性
       heavenSonNode : cc.Node,//node不能存到预制件里，storage应该也不太好存吧
       level : cc.Integer,
       power : cc.Integer,
       defend: cc.Integer,
       HP    : cc.Integer,
       ownTreasure : {
           default :[],
           type : [Treasure]
       },
       staticImage:{
        default:null,
        type: cc.SpriteFrame,
       },
       e_headPortrait:{
            default:null,
            type: cc.SpriteFrame,
       },
    }
})
//能跨文件夹调用类吗
var Treasure = cc.Class({
    name : '灵宝',
    properties :{
       treasureNode : cc.Node,
       level : cc.Integer,
       power : cc.Integer,
       defend: cc.Integer,
       HP    : cc.Integer,
    }
})


cc.Class({
    extends: cc.Component,

    properties: {
        level : {
            default : 1,
            type : cc.Integer,
        },
        stoneNum : {
            default : 1000,
            type : cc.Integer,
        },
        hmzqNum : {
            default : 1000,
            type : cc.Integer,
        },
        currentWorld : {
            default : 1,
            type : cc.Integer,
        },//代表玩家此时在哪一个界 ? 实现有可能有问题
        fighterID : {
            default : 1,
            type : cc.Integer,
        },
        
        years : {
            default : 0,
            type : cc.Integer,
        },// 文字剧情使用
        sons : {
           default : [] ,
           type : [HeavenSon]
        },
        treasures : {
            default : [] ,
            type : [Treasure]
         },
         

    },

    onload(){
        var level = getData("level");
        if(level){
            this.level = level;
        }
        //...

    },
    //数据持久化
    // loadInformation(){
    //     cc.sys.localStorage.setItem("level", JSON.stringify(this.level));
    //     this.level = cc.sys.localStorage.getItem("level");
    //     //与浏览器类似
    // },

    getData(dataName){
        return cc.sys.localStorage.getItem(dataName);
    },
    setData(dataName,data){
        cc.sys.localStorage.setItem(dataName, JSON.stringify(data));
    },
    start () {

    },

});

