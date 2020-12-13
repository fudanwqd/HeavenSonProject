var Treasure = cc.Class({
    name : '灵宝',
    properties :{
       treasureDemo : {
           default : null,
           type : require("../静态数据/TreasureDemo"),
       },
       treasureId:cc.Integer,
    //    level : cc.Integer,
       power : cc.Integer,
       defend: cc.Integer,
       HP    : cc.Integer,
       isInWorld : cc.Boolean,
    }
}) 
var HeavenSon = cc.Class({
    name : '天道之子',
    properties :{
        heavenSonDemo : {
            default : null,
            type : require("../静态数据/HeavenSonDemo"),
        },
       name : cc.String,
       heavenSonId : cc.Integer,
       level : cc.Integer,
       exp: cc.Integer,//当前级别修为（经验）值； 该级别满值（能突破的时候）=expBase*level
       power : cc.Integer,
       defend: cc.Integer,
       HP    : cc.Integer,
       growRate : cc.Float,
       ownTreasures : {
           default :[],
           type : [Treasure]
           // 拥有的灵宝的ID
       },
       
    }
})
//能跨文件夹调用类吗


cc.Class({
    extends: cc.Component,

    properties: {
        level : {
            default : 1,
            type : cc.Integer,
        },
        stoneNum : {
            default : 500,
            type : cc.Integer,
        },
        hmzqNum : {
            default : 500,
            type : cc.Integer,
        },
        currentWorld : {
            default : "仙界",
            // type : cc.String,
        },//代表玩家此时在哪一个界 ? 实现有可能有问题
        fighterID : {
            default : 0,
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
// 删除数组指定元素
    arrRemove(it, arr) {
        if (!arr || arr.length == 0) {
            return ""
        }
        let flag = arr.indexOf(it)
        if (flag > -1) {
            arr.splice(flag, 1)
            return arr
        } else {
            console.log("未查找到该元素")
        }
    },
    

    getData(dataName){
        return JSON.parse(cc.sys.localStorage.getItem(dataName));
    },

    setData(dataName,data){
        var decycled =  JSON.decycle(data);
        cc.sys.localStorage.setItem(dataName, JSON.stringify(decycled));
    },
    onLoad(){
        // //清空数据缓存 一次性使用需删去
        // clearDataS = cc.find("清空数据缓存").getComponent("e_clearData");
        // clearDataS.clearData();

        // 将数据从已有数据开始进行初始化，如果localstorage中有数据，则使用localstorage数据，否则使用默认数据

        cc.log("userdata onload!");
        // for test
        // cc.log(this.getData("heavenSons"));
        // this.gameNode = cc.find("game").getComponent("game");
        var level = this.getData("level");
        if(level){
            this.level = level;
        }

        var stoneNum =  this.getData("stoneNum");
        if(stoneNum){
            this.stoneNum = stoneNum;
        }

        var hmzqNum =  this.getData("hmzqNum");
        if(hmzqNum){
            this.hmzqNum = hmzqNum;
        }

        var currentWorld =  this.getData("currentWorld");
        if(currentWorld){
            this.currentWorld = currentWorld;
        }

        var fighterID =  this.getData("fighterID");
        if(fighterID){
            this.fighterID = fighterID;
        }

        var years =  this.getData("years");
        if(years){
            this.years = years;
        }

        var sons =  this.getData("heavenSons");
        if(sons){
            this.sons = sons;
        }

        var treasures =  this.getData("treasures");
        if(treasures){
            this.treasures = treasures;
        }
        var expBase =  this.getData("expBase");
        if(expBase){
            this.expBase = expBase;
        }

        var maxLevel = this.getData("maxLevel");
        if(maxLevel){
            this.maxLevel = maxLevel;
        }


        // 常驻节点  不写的话，虽然通过game能调用函数和静态值，但是sons这种就没有了
        cc.game.addPersistRootNode(this.node);

        //定义一个数据结构（属性），存放置在世界中的灵宝
        // this.treasuresInWorld["神界"] = [Treasure]
        this.treasuresInWorld={
            "神界":[],
            "仙界":[],
            "魔界":[],
            "人界":[],
            "冥界":[],
            "妖界":[]
        };
        //...待初始化（/读取storage）

        var treasuresInWorld = this.getData("treasuresInWorld");
        if(treasuresInWorld){
            this.treasuresInWorld = treasuresInWorld;
        }

        //...

        //获得玩家总共获得过的天道之子个数，用于分配天道之子ID
        var heavenSonNum = this.getData("totalHeavenSonNum");
        if(heavenSonNum){
            this.totalHeavenSonNum = heavenSonNum;
        }else{
            this.totalHeavenSonNum = this.sons.length;
        }


        //获得玩家总共获得过的灵宝个数，用于分配灵宝ID
        var totalTreasureNum = this.getData("totalTreasureNum");
        if(totalTreasureNum){
            this.totalTreasureNum = totalTreasureNum;
        }else{
            this.totalTreasureNum = this.treasures.length;
        }

    },
    //用户属性的getset方法,set时认为数据已经更新，因此要和数据库进行同步
    getLevel(){
        // for test
        // cc.log("getlevel :"+this.getData("level"));
        return this.level;
    },

    setLevel(level){
        if(level>0){
            this.level = level;
        }
        // for test
        // cc.log("setlevel");
        this.setData("level",this.level);
        
    },

    getStoneNum(){
        return this.stoneNum;
    },

    setStoneNum(num){
        if(num>=0){
            this.stoneNum = num;
            this.setData("stoneNum",num);
        }
    },


    getHmzqNum(){
        return this.hmzqNum;
    },

    setHmzqNum(num){
        if(num>=0){
            this.hmzqNum = num;
            this.setData("hmzqNum",num);
        }
    },


    getCurrentWorld(){
        return this.currentWorld;
    },

    // setCurrentWorld(worldID){
    //     if(worldID>=0){
    //         this.currentWorld = worldID;
    //     }
    // },
    setCurrentWorld(world){//worldID 直接以字符串形式
        this.currentWorld = world;
        this.setData("currentWorld",world);
    },

    getFighterID(){
        return this.fighterID;
    },

    setFighterID(fighterID){
        if(fighterID>=0){
            this.fighterID = fighterID;
            this.setData("fighterID",fighterID);
        }

    },

    getYears(){
        return this.years;
    },

    setYears(years){
        if(years>0){
            this.years = years;
        }
        this.setData("years",years);
    },

    getExpBase(){
        return this.expBase;
    },

    setExpBase(exp){
        if(exp>=0){
            this.expBase = exp;
            this.setData("expBase",exp);
        }
    },

    getMaxLevel(){
        return  this.maxLevel;
    },

    setMaxLevel(maxlevel){
        if(maxlevel>0){
            this.maxLevel = maxlevel;
            this.setData("maxLevel",maxlevel);
        }
    },

    setTotalHeavenSonNum(num){
        this.totalHeavenSonNum = num;
        this.setData("totalHeavenSonNum",num);
    },
    setTotalTreasureNum(num){
        this.totalTreasureNum = num;
        this.setData("totalTreasureNum",num);
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
        // ！！！ 目前将天道之子更新后的写入localstorage注释了，因为sons的对象存储会导致循环引用问题，暂时还没能解决
        this.updateHeavenSon();
    },

// 根据id删除玩家拥有的天道之子
    deleteChild(childID){
        var child = getChildByID(childID);
        if(child){
            this.sons.remove(child);
        }
        this.updateHeavenSon();
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
        this.updateHeavenSon();
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
        this.updateTreasure();
    },

    deleteTreasure(treasureID){
        var treasure = getTreasureByID(treasureID);
        if(treasure){
            this.treasures.remove(treasure);
        }
        this.updateTreasure();
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

    updateHeavenSon(){
        this.setData("heavenSons",this.sons);
    },

    updateTreasure(){
        this.setData("treasures",this.treasures)
    },

    //将灵宝treasure从天道的灵宝库，放置到某界world   （this.treasuresInWorld）
    addTreasureToWorld(treasure,world){
        this.treasuresInWorld[world].push(treasure);//测试时暂用
        //...
        this.updateTreasureInWorld();
    },

    //将灵宝treasure从某界world中删除       （this.treasuresInWorld）
    deleteTreasureFromWorld(treasure,world){
        //...
        this.arrRemove(treasure,this.treasuresInWorld[world]);
        // this.treasuresInWorld[world].removeItem(treasure);
        this.updateTreasureInWorld();
    }, 
    
    removeTreasureFromWorldByID(treasureID,worldType){
        this.treasuresInWorld[worldType].forEach(element => {
            if(element.treasureId == treasureID){
                this.arrRemove(element,this.treasuresInWorld[worldType]);
            
            }
        })
    },

    //更新六界中的灵宝       （this.treasuresInWorld）
    updateTreasureInWorld(){
        //...
        this.setData("treasuresInWorld",this.treasuresInWorld);
    },

   

    // for test
    
    // createTestHeavenSon(HeavenSonDemo){
    //     var newHeavenSon = new HeavenSon();
    //     newHeavenSon.heavenSonDemo = HeavenSonDemo;
    //     newHeavenSon.heavenSonId = 1;
    //     return newHeavenSon;
    // }

    setTreasuresInWorld(treasuresInWorld){
        this.treasuresInWorld = treasuresInWorld;
        this.updateTreasureInWorld();
    },

    getRandomRange(min,max){
        return Math.floor(Math.random()*(max - min + 1)) + min; 
    },


    // 根据demoId 创建一个新的天道之子实例
    createNewHeavenSonByDemoID(heavenSonDemoId){
        var newHeavenSon = new HeavenSon();
        var gameNode =  cc.find("game").getComponent("game");
        var heavenSonDemo = gameNode.getHeavenSonDemoByID(heavenSonDemoId);
        newHeavenSon.heavenSonDemo = heavenSonDemo;
        var heavenSonId = this.totalHeavenSonNum;
        this.setTotalHeavenSonNum(++heavenSonId);
        newHeavenSon.heavenSonId = heavenSonId;
        //根据随机数获得天道之子实例的攻击力和防御力
        newHeavenSon.power = this.getRandomRange(heavenSonDemo.minPower,heavenSonDemo.maxPower);
        newHeavenSon.defend = this.getRandomRange(heavenSonDemo.minDefend,heavenSonDemo.maxDefend);
        newHeavenSon.HP = heavenSonDemo.HP;
        return newHeavenSon;
    },


    // 根据demoId 创建一个新的灵宝实例
    createNewTreasureByDemoID(treasureDemoId){
        var newTreasure = new Treasure();
        var gameNode =  cc.find("game").getComponent("game");
        var treasureDemo = gameNode.getTreasureDemoByID(treasureDemoId);

        // console.log(treasureDemoId);
        // console.log(treasureDemo);


        newTreasure.treasureDemo = treasureDemo;
        var treasureId = this.totalTreasureNum;
        this.setTotalTreasureNum(++treasureId);
        newTreasure.treasureId = treasureId;

        //根据随机数获得灵宝实例的攻击力和防御力
        newTreasure.power = this.getRandomRange(treasureDemo.minPower,treasureDemo.maxPower);
        newTreasure.defend = this.getRandomRange(treasureDemo.minDefend,treasureDemo.maxDefend);
        newTreasure.HP = treasureDemo.HP;
        newTreasure.name = treasureDemo.name;
        return newTreasure;
    },

    

});

