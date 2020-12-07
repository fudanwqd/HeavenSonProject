
// 主要负责灵宝界面的显示功能，
cc.Class({
    extends: cc.Component,

    properties: {
        treasurePrefab : {
            default: null,
            type : cc.Prefab
        },

        storageNode : {
            default : null,
            type : cc.Node, 
        },

        worldNode : {
            default : null,
            type : cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.game  = cc.find("game").getComponent("game");
        this.userData = this.game.userData;
        this.displayAllTreasureInStorage();
        
        this.displayAllTreasureInOneWorld();

        //for test 

        // cc.sys.localStorage.removeItem("heavenSons");//treasures
        // cc.sys.localStorage.removeItem("treasures");
        // cc.sys.localStorage.removeItem("treasuresInWorld");
        // var currentWorld =  this.userData.getCurrentWorld();
        // var displayTreasures =  this.userData.treasuresInWorld[currentWorld];
        // cc.log(displayTreasures.length);
        // temp ={
        //     "神界":[],
        //     "仙界":[],
        //     "魔界":[],
        //     "人界":[],
        //     "冥界":[],
        //     "妖界":[]
        // };
        // this.userData.setTreasuresInWorld(temp);
        // var treasures = this.userData.getAllOwnedTreasures();
        // treasures[0].isInWorld = false;
        // this.userData.updateTreasure();
    },

    displayAllTreasureInStorage(){
        // 需要展示所有玩家拥有的灵宝，还是只用展示没有放在世界中的灵宝
        // 先清空节点下的children
        // this.storageNode.children = [];
        var treasures = this.userData.getAllOwnedTreasures();
        var currentWorld =  this.userData.getCurrentWorld();
        treasures.forEach(element => {
            if(!element.isInWorld){
                // 只展示没有在世界放置的灵宝
                newNode = cc.instantiate(this.treasurePrefab);
                newNode.parent =  this.storageNode;
                
                treasureControl = newNode.getComponent("treasureControls");
                // 只有本界的灵宝可以转移到六界中，其他界的会加上蒙层
                treasureControl.init(element,element.treasureDemo.type==currentWorld);
                // 默认不展示灵宝，点击后添加勾选框 并在右侧展示灵宝详细信息
                // if(i==0){
                //     treasureControl.touch();//相当于点了一下
                // }
            }
        }
        )
        this.node.active = true;
    },


    displayAllTreasureInOneWorld(){
        var currentWorld =  this.userData.getCurrentWorld();
        // 更改下面的文字
        var label = cc.find("Canvas/某界灵宝详情/某界灵宝-文字");
        label.getComponent(cc.Label).string = currentWorld+"灵宝";


        // 只显示处于该界的灵宝
        this.worldNode.children = [];
       
        var displayTreasures =  this.userData.treasuresInWorld[currentWorld];
        displayTreasures.forEach(element => {
            newNode = cc.instantiate(this.treasurePrefab);
            newNode.parent =  this.worldNode;
            treasureControl = newNode.getComponent("treasureControls");
            treasureControl.init(element,true);
        })
    },

    start () {

    },

    

    // update (dt) {},
});
