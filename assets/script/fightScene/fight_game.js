cc.Class({
    extends: cc.Component,

    properties: {
        mapNode : cc.Node,
        PREFAB : cc.Prefab,
        parent : cc.Node,
        autoLoad : true,
    },


    

    onLoad () {
        cc.director.resume();
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;


        this.enemies = this.node.getChildByName('enemies');
        this.havenSon = this.node.getChildByName('hero').getComponent('havenSon');
        this.enemyCount = 0;
        this.isIniEnemy = false;

        this.game = cc.find('game').getComponent('game');

        this.userData = this.game.userData;
        this.treasuresLen = cc.find('灵宝s').getComponent('TreasureDB').treasures.length;
        
        this.victory = false;
        
        this.iniMapNode(this.mapNode);

        this.enemyPerBattle = 2;
        this.battleCount = 1;//3波
        this.nowBattleIndex = 0;
    },

    //生成敌人
    iniEnemy(count){//生成的怪物数量
        this.isIniEnemy = true;
        this.nowBattleIndex++;


        console.log("生成怪物");
        if(this.autoLoad){
            let interval = 2;//2秒执行一次
            // let repeat = 1;//默认执行一次，重复执行次数，怪物的个数。= 1，意味着有两个怪
            let delay = 2;//延时
            this.schedule(function() {
                this.loadEnemyPrefab();
            }, interval, count - 1, delay);
        }
        this.enemyPerBattle++;

        if(this.nowBattleIndex == this.battleCount){
            this.battleEnd = true;
        }
    },

    //加载敌人预制件
    loadEnemyPrefab(){
        let node = cc.instantiate(this.PREFAB);
        node.active = true;
        this.enemies.addChild(node);

        // console.log('动态加载');
        // node.setPosition(cc.v2());//设置位置
        node.parent = this.enemies;
    },


    //根据地图，动态生成墙
    iniMapNode(mapNode){
        let tiledMap = mapNode.getComponent(cc.TiledMap);
        let tiledSize = tiledMap.getTileSize();
        let layer = tiledMap.getLayer('wall');
        let layerSize = layer.getLayerSize();

        for(let i = 0;i < layerSize.width;i++){
            for(let j = 0;j < layerSize.height;j++){
                let tiled = layer.getTiledTileAt(i, j, true);
                if(tiled.gid != 0){
                    tiled.node.group = 'wall';

                    let body = tiled.node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    let collider = tiled.node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(tiledSize.width / 2, tiledSize.height / 2);
                    collider.size = tiledSize;
                    collider.apply();
                }
            }
        }
    },

    start () {

    },


    newTreasure(){
        this.newTreasures = [];
        for(var i = 0;i < 3;i++){
            var rate = Math.random(); // 左闭右开
            var demoID = Math.floor(Math.random()*(this.treasuresLen));
            if(rate > 0.5){
                this.newTreasures.push(this.userData.createNewTreasureByDemoID(demoID));
            }
            console.log(rate, demoID);
        }

    },


    victoryBattle(){
        console.log('战斗胜利');
        this.victory = true;
        this.newTreasure();
        this.victoryPage = cc.find("Canvas/victoryPage");

        this.victoryPage.active = true;
        this.node.active = false;

        this.none = cc.find('Canvas/victoryPage/none');
        this.treasures = cc.find("Canvas/victoryPage/treasures");

        if(this.newTreasures.length == 0){
            this.none.active = true;
            this.treasures.active = false;
        }else{
            // 没有实现动态处理，就很蠢
            this.none.active = false;
            this.treasures.active = true;
            
            var index = 0;
            if(this.newTreasures[0]){
                var trea = cc.find('Canvas/victoryPage/treasures/占位符1').getComponent(cc.Label);
                trea.string = this.newTreasures[0].name;
            }else{
                cc.find('Canvas/victoryPage/treasures/占位符1').active = false;
            }

            if(this.newTreasures[1]){
                var trea = cc.find('Canvas/victoryPage/treasures/占位符2').getComponent(cc.Label);
                trea.string = this.newTreasures[1].name;
            }else{
                cc.find('Canvas/victoryPage/treasures/占位符2').active = false;
            }

            if(this.newTreasures[2]){
                var trea = cc.find('Canvas/victoryPage/treasures/占位符3').getComponent(cc.Label);
                trea.string = this.newTreasures[2].name;
            }else{
                cc.find('Canvas/victoryPage/treasures/占位符3').active = false;
            }   
        }

        // 用户经验未更新
        // 获得灵宝未同步

        
        // this.userData.expBase += 10;
        
       
    },


    update (dt) {
        // console.log(this.enemies.childrenCount);
        // console.log(this.isIniEnemy);
        
        if(this.battleEnd && this.enemies.childrenCount == 0 && !this.isIniEnemy && !this.victory){
            this.victoryBattle();
        }else if(this.enemies.childrenCount == 0 && !this.isIniEnemy 
            && this.nowBattleIndex < this.battleCount){
            this.iniEnemy(this.enemyPerBattle);
            // console.log("波次：", this.nowBattleIndex, "生成新的怪兽");
        }
    },


    
    ShowBackPage(){
        let backPage = cc.find("Canvas/backPage");
        cc.director.pause();
        backPage.active = true;
        this.active = false;
    },

    backMainScence(){
        this.node.destroy();
        let backPage = cc.find("Canvas/backPage");
        backPage.destroy();
        this.game.switchScene('mainScene');
    },

    backFightScence(){
        this.active = true;
        cc.director.resume();
        let backPage = cc.find("Canvas/backPage");
        backPage.active = false;
    }
});
