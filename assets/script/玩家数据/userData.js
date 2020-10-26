var HeavenSon = cc.Class({
    name : '天道之子',
    properties :{
       heavenSonDemo : Object,
       heavenSonId : cc.Integer,
       level : cc.Integer,
       exp: cc.Integer,//当前级别修为（经验）值； 该级别满值（能突破的时候）=expBase*level
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
       treasureDemo : Object,
       treasureId:cc.Integer,
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
        expBase : {//经验基础  每级（100点）
            default : 100,
            type : cc.Integer,
        },
        maxLevel : {//等级上限（如 1~10:炼气，11~20：筑基... 90~100：大乘）
            default : 100,
            type : cc.Integer,
        },

    },

    onload(){
        // 将数据从已有数据开始进行初始化，如果localstorage中有数据，则使用localstorage数据，否则使用默认数据
        var level = getData("level");
        if(level){
            this.level = level;
        }

        var stoneNum = getData("stoneNum");
        if(stoneNum){
            this.stoneNum = stoneNum;
        }

        var hmzqNum = getData("hmzqNum");
        if(hmzqNum){
            this.hmzqNum = hmzqNum;
        }

        var currentWorld = getData("currentWorld");
        if(currentWorld){
            this.currentWorld = currentWorld;
        }

        var fighterID = getData("fighterID");
        if(fighterID){
            this.fighterID = fighterID;
        }

        var years = getData("years");
        if(years){
            this.years = years;
        }

        var sons = getData("sons");
        if(sons){
            this.sons = sons;
        }

        var treasures = getData("treasures");
        if(treasures){
            this.treasures = treasures;
        }
        var expBase = getData("expBase");
        if(expBase){
            this.expBase = expBase;
        }

        var maxLevel = getData("maxLevel");
        if(maxLevel){
            this.maxLevel = maxLevel;
        }


        
        //...

    },
    //用户属性的getset方法,set时认为数据已经更新，因此要和数据库进行同步

    getStoneNum(){
        return this.stoneNum;
    },

    setStoneNum(num){
        if(num>=0){
            this.stoneNum = num;
        }
    },


    getHmzqNum(){
        return this.hmzqNum;
    },

    setHmzqNum(num){
        if(num>=0){
            this.hmzqNum = num;
        }
    },


    getCurrentWorld(){
        return this.currentWorld;
    },

    setCurrentWorld(worldID){
        if(worldID>=0){
            this.currentWorld = worldID;
        }
    },
    

    getFighterID(){
        return this.fighterID;
    },

    setFighterID(fighterID){
        if(fighterID>=0){
            this.fighterID = fighterID;
        }
    },

    getYears(){
        return this.years;
    },

    setYears(years){
        if(years>0){
            this.years = years;
        }
    },

    getExpBase(){
        return this.expBase;
    },

    setExpBase(exp){
        if(exp>=0){
            this.expBase = exp;
        }
    },

    getMaxLevel(){
        return  this.maxLevel;
    },

    setMaxLevel(maxlevel){
        if(maxlevel>0){
            this.maxLevel = maxlevel;
        }
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

 //根据getChildByID（childID）：根据身份id获得该天道之子对象
    getChildByID(childID){
        var returnChild = null;
        this.sons.forEach(element => {
            if(element.heavenSonId==childID){
                returnChild = element;
                return;
            }
        });
        return returnChild;
        //...
        // return HeavenSonDemo
    },
// 为玩家新增一个天道之子，输入天道之子对象
    addNewChild(heavenSon){
        this.sons.push(heavenSon);
        //更新数据之后进行数据的存储
        updateHeavenSon();
    },

// 根据id删除玩家拥有的天道之子
    deleteChild(childID){
        var child = getChildByID(childID);
        if(child){
            this.sons.remove(child);
        }
        updateHeavenSon();
    },

// 根据下标获得玩家的天道之子
    getChildByIndex(index){
        if(index<0||index>=this.sons.length){
            return null;
        }
        return this.sons[index];
    },

    //更改某天道之子
    changeChild(heavenSon){
        //...
        // 这里有一个问题，就是其他界面在拿到天道之子对象后，在这个对象上进行修改，是否会影响到用户数据中原有的对象，也就是传递的是不是个引用
        // 如果是引用，这个方法就不需要实现，否则需要将新对象刷新到用户数据中
        updateHeavenSon();
    },



    getTreasureByID(treasureID){
        var returnTreasure = null;
        this.treasures.forEach(element => {
            if(element.treasureId==treasureID){
                returnTreasure = element;
                return;
            }
        });
        return returnTreasure;
    },

    addNewTreasure(treasure){
        this.treasures.push(treasure);
        updateTreasure();
    },

    deleteTreasure(treasureID){
        var treasure = getTreasureByID(treasureID);
        if(treasure){
            this.treasures.remove(treasure);
        }
        updateTreasure();
    },

    getTreasureByIndex(index){
        if(index<0||index>=this.sons.length){
            return null;
        }
        return this.sons[index];  
    },



    //获得玩家拥有的全部天道之子对象
    getAllOwnedHeavenSons(){
        return this.sons;
        //...
        //return HeavenSon[]
    },

    getAllOwnedTreasures(){
        return this.treasures;
    },
    start () {

    },

    updateHeavenSon(){
        setData("heavenSons",this.sons);
    },

    updateTreasure(){
        setData("treasures",this.treasures)
    }


    

});

