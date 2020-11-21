cc.Class({
    extends: cc.Component,

    properties: {
        mapNode : cc.Node,
        PREFAB : cc.Prefab,
        parent : cc.Node,
        autoLoad : true,
    },


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = true;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;


        this.enemies = this.node.getChildByName('enemies');
        this.enemyCount = 0;
        this.isIniEnemy = false;


        // this.temp = cc.find('game');
        // console.log(this.temp);
        // this.game = this.temp.getComponent('game');
        // this.game.onLoad();
        this.game = cc.find('game').getComponent('game');
        
        
        this.iniMapNode(this.mapNode);

        this.enemyPerBattle = 2;
        this.battleCount = 3;//3波
        this.nowBattleIndex = 0;
        // this.iniEnemy(this.enemyPerBattle);
        
        this.node.on(cc.Node.EventType.CHILD_ADDED, function(){
            this.addEnemyCount()
        }, this);
        // this.node.on(cc.Node.EventType.CHILD_REMOVED, this.removeEnemyCount(), this);
        
    },

    addEnemyCount(){
        this.enemyCount++;
        console.log('增加子节点');
    }, 

    // removeEnemyCount(){
    //     console.log('移除子节点');
    //     this.enemyCount--;
    //     if(this.enemyCount == 0){
    //         console.log('生成新的怪兽');
    //         this.iniEnemy(4);
    //     }
    // }, 

    //初始化敌人
    iniEnemy(count){//生成的怪物数量
        console.log("怪物初始化");
        if(this.autoLoad){
            let interval = 2;//2秒执行一次
            // let repeat = 1;//默认执行一次，重复执行次数，怪物的个数。=1，意味着有两个怪
            let delay = 2;//延时
            this.schedule(function() {
                this.loadEnemyPrefab();
            }, interval, count - 1, delay);
        }
        this.enemyPerBattle++;
    },

    //加载敌人预制件
    loadEnemyPrefab(){
        let node = cc.instantiate(this.PREFAB);
        node.active = true;
        this.enemies.addChild(node);

        console.log('动态加载');
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

    update (dt) {
        // console.log(this.enemies.childrenCount);
        // console.log(this.isIniEnemy);
        if(this.nowBattleIndex == this.battleCount && this.enemies.childrenCount == 0){
            // to do 战斗胜利
            console.log('战斗胜利');
            // console.log(this.nowBattleIndex);

        }else if(this.enemies.childrenCount == 0 && !this.isIniEnemy 
            && this.nowBattleIndex < this.battleCount){
            this.iniEnemy(this.enemyPerBattle);
            this.isIniEnemy = true;
            this.nowBattleIndex++;
            console.log("波次：", this.nowBattleIndex, "生成新的怪兽");
        }
    },
});
