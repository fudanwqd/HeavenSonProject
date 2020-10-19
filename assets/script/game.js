

cc.Class({
    extends: cc.Component,

    properties: {
       userDataNode : cc.Node,
       HeavenSonDatabaseNode : cc.Node,
       TreasureDatabaseNode : cc.Node,
       MonsterDatabaseNode : cc.Node,

    },

    onload(){
        this.userData = this.userDataNode.getComponent("userData");
        this.HeavenSonDB = this.HeavenSonDatabaseNode.getComponent("HeavenSonDB");
        this.TreasureDB = this.TreasureDatabaseNode.getComponent("TreasureDB");
        this.MonsterDB = this.MonsterDatabaseNode.getComponent("MonsterDB");

        // 常驻节点
        cc.game.addPersistRootNode(this.node);
    },
    // 加载切换场景 
    switchScene(sceneName){
        cc.director.loadScene(sceneName);//可能需要回调函数
    },

    start () {
//try git
    },

});
