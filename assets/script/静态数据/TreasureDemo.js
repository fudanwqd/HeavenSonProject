TreasureDemo = cc.Class({
    name : "灵宝模板",
    properties : {
        name : cc.String,
        treasurDemoId : cc.Integer,
        type : cc.String,//世界
        minPower : cc.Integer,
        maxPower : cc.Integer,
        minDefend: cc.Integer,
        maxDefend: cc.Integer,
        minHP : cc.Integer,
        maxHP : cc.Integer,
        quality : cc.Integer,
        minCosttTime : cc.Integer, //修炼获得时所需时间
        maxCostTime : cc.Integer, //跨界修炼时获取所需时间

    }
})