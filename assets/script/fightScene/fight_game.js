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


        this.iniMapNode(this.mapNode);


        if(this.autoLoad){
            let interval = 2;//2秒执行一次
            let repeat = 1;//默认执行一次，重复执行次数，怪物的个数。=1，意味着有两个怪
            let delay = 2;//延时
            this.schedule(function() {
                this.loadPrefab();
            }, interval, repeat, delay);
        }
    },

    loadPrefab(){
        let node = cc.instantiate(this.PREFAB);
        node.active = true;
        this.node.addChild(node);

        console.log('动态加载');
        // node.setPosition(cc.v2());
        node.parent = this.node;
    },


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

    update (dt) {},
});
