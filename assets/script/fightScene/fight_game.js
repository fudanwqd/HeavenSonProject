cc.Class({
    extends: cc.Component,

    properties: {
        mapNode : cc.Node,
        PREFAB : cc.Prefab,
        parent : cc.Node,
        autoLoad : true,
        clickAudio : {
            default : null,
            type : cc.AudioClip,
        },

        victoryAudio : {
            default : null,
            type : cc.AudioClip,
        },


        failAudio : {
            default : null,
            type : cc.AudioClip,
        },

        backgroundAudio : {
            default : null,
            type : cc.AudioClip,
        },
    },


    

    onLoad () {
        cc.director.resume();
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = true;
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;


        this.enemies = this.node.getChildByName('enemies');
        this.havenSon = this.node.getChildByName('hero').getComponent('havenSon');
        this.page = cc.find('Canvas/victoryPage');

        this.enemyCount = 0;
        this.isIniEnemy = false;

        this.game = cc.find('game').getComponent('game');

        this.userData = this.game.userData;
        this.treasuresLen = cc.find('灵宝s').getComponent('TreasureDB').treasures.length;
        this.havenSonInstance = this.userData.getChildByID(this.userData.fighterID);
        // console.log(this.havenSonInstance);

        this.victory = false;
        
        this.iniMapNode(this.mapNode);

        this.enemyPerBattle = 2;
        this.battleCount = 3;//3波
        this.nowBattleIndex = 0;

        // 生成的怪物种类
        this.enemyKindId = 1;


        cc.audioEngine.playMusic(this.backgroundAudio, true, 1);

        // console.log(this.userData.currentWorld);// 获取当前所在世界
    },

    //生成敌人
    iniEnemy(count){//生成的怪物数量
        this.isIniEnemy = true;
        this.nowBattleIndex++;


        // console.log("生成怪物, id: ", this.enemyKindId);
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
        for(var i = 0;i < 7;i++){
            var rate = Math.random(); // 左闭右开
            var demoID = Math.floor(Math.random()*(this.treasuresLen));
            if(rate > 0.5){
                this.newTreasures.push(this.userData.createNewTreasureByDemoID(demoID));
            }
            // console.log(rate, demoID);
        }
    },


    
    ShowVictoryPage(){
        //天道之子经验更新
        this.updateExp();

        //灵石更新
        this.updateStone();

        // 装备更新
        this.updateTreasures();
    },

    updateExp(){
        if(this.havenSonInstance.level < this.userData.maxLevel){
            console.log('等级更新');
            let upExp = this.havenSonInstance.level * this.userData.expBase;
            let rand = this.userData.getRandomRange(10, 20);
            console.log(rand);
            let exp =  rand * 10;
            console.log(exp);
            this.havenSonInstance.exp += exp;
            // console.log(this.havenSonInstance.exp);
            if(this.havenSonInstance.exp >= upExp){// 升级
                this.havenSonInstance.exp -= upExp;
                this.havenSonInstance.level++;

                // 属性更新
                this.updatePro();
            }   
            this.page.getChildByName('exp').getChildByName('num').getComponent(cc.Label).string = exp;

            if(this.havenSonInstance.level == this.userData.maxLevel){
                this.havenSonInstance.exp = upExp;
            }
            // console.log(this.havenSonInstance.exp);
        }
    }, 

    updateStone(){
        let stoneNum = this.userData.getRandomRange(10, 100);
        this.havenSonInstance.exp += stoneNum;
        this.page.getChildByName('stone').getChildByName('num').getComponent(cc.Label).string = stoneNum;
        this.userData.setStoneNum(stoneNum + this.userData.getStoneNum());
    },

    updateTreasures(){
        console.log('装备更新');
        for(var i = 0;i < 7;i++){
            this.item = this.page.getChildByName('item' + i);
            if(this.newTreasures.length <= i){
                this.item.getChildByName('img').active = false;
                this.item.getChildByName('name-img').active = false;
                this.item.getChildByName('name').active = false;
            }else{
                this.item.getChildByName('name').getComponent(cc.Label).string = this.newTreasures[i].name;
                this.item.getChildByName('img').getComponent(cc.Sprite).spriteFrame = this.newTreasures[i].treasureDemo.staticImage;
            }
        }

        this.newTreasures.forEach(element => {
            this.userData.addNewTreasure(element);
        });
    },


    victoryBattle(){
        this.playAudio(this.victoryAudio);
        console.log('战斗胜利');
        this.victory = true;
        this.newTreasure();
        this.victoryPage = cc.find("Canvas/victoryPage");

        this.victoryPage.active = true;
        this.node.active = false;

        this.none = cc.find('Canvas/victoryPage/none');
        this.treasures = cc.find("Canvas/victoryPage/treasures");


        // 结算 and 展示
        this.ShowVictoryPage();
    },


    // 更新属性
    updatePro(){
        console.log('属性更新');
        let demo = this.havenSonInstance.heavenSonDemo;
        this.havenSonInstance.power += Math.floor(this.userData.getRandomRange(10, 50) * demo.quality 
        * this.havenSonInstance.growRate); 
        this.havenSonInstance.defend += Math.floor(this.userData.getRandomRange(10, 50) * demo.quality 
        * this.havenSonInstance.growRate);
        this.havenSonInstance.HP += Math.floor(this.userData.getRandomRange(10, 50) * demo.quality 
        * this.havenSonInstance.growRate);  
        console.log('hp: ', this.havenSonInstance.HP, ', power: ', this.havenSonInstance.power, ' , defend: ', this.havenSonInstance.defend);
    }, 


    update (dt) {        
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
        this.node.active = false;
        this.playAudio(this.clickAudio);
    },

    backMainScence(){
        this.node.destroy();
        let backPage = cc.find("Canvas/backPage");
        backPage.destroy();

        let failPage = cc.find('Canvas/failPage');
        failPage.destroy();

        this.game.switchScene('mainScene');
        this.playAudio(this.clickAudio);
    },

    backFightScence(){
        this.node.active = true;
        cc.director.resume();
        let backPage = cc.find("Canvas/backPage");
        backPage.active = false;
        this.playAudio(this.clickAudio);
    },

    showFailPage(){
        let failPage = cc.find('Canvas/failPage');
        failPage.active = true;
        this.node.active = false;
        this.playAudio(this.failAudio);
    },


    playAudio(audio){
        cc.audioEngine.play(audio, false, 1);
    },

    onDestroy: function () {
        console.log("销毁战斗界面");
        cc.audioEngine.stopMusic(this.backgroundAudio);
    },
});
