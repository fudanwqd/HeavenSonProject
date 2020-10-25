

cc.Class({
    extends: cc.Component,

    properties: {
       userDataNode : cc.Node,
       HeavenSonDatabaseNode : cc.Node,
       TreasureDatabaseNode : cc.Node,
       MonsterDatabaseNode : cc.Node,

    },

    onLoad(){
        this.userData = this.userDataNode.getComponent("userData");
        this.HeavenSonDB = this.HeavenSonDatabaseNode.getComponent("HeavenSonDB");
        this.TreasureDB = this.TreasureDatabaseNode.getComponent("TreasureDB");
        this.MonsterDB = this.MonsterDatabaseNode.getComponent("MonsterDB");

        cc.log("into game onload");//
        // 常驻节点
        cc.game.addPersistRootNode(this.node);
    },
    // 加载切换场景 
    switchScene(sceneName){
        cc.director.loadScene(sceneName);//可能需要回调函数
    },

    start () {

    },

    //根据getChildbyID（childID）：根据身份id获得该天道之子对象HeavenSon
    getChildbyID(childID){
        //...
        // return HeavenSon
    },

    //获得玩家拥有的全部天道之子对象
    getAllOwnedHeavenSons(){
        //...
        //return HeavenSon[]
    }
 

});//which one
