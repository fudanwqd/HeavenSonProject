// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        storageNode : {
            default : null,
            type : cc.Node, 
        },

        worldNode : {
            default : null,
            type : cc.Node,
        }
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    FromWorldToStorage(){
        // 从世界中向灵宝库中收回
        var worldTresures =   this.worldNode.children;
        worldTresures.forEach(element => {
            // element 是展示的一个灵宝节点
            var checkbox = element.getChildByName("灵宝-勾选图");
            if(checkbox.active){
                 element.parent = this.storageNode;
                // 应当将这个灵宝从treasureInWorld属性中划去，并更改用户的灵宝的isInWorld的属性，如何获得这个node的灵宝的信息
                treasureControl = element.getComponent("treasureControls");
                // //脚本对于每个节点而言应该是共用的，因此在多次init之后，这个脚本中的treasure对象应当是最后一个init附上的值
                // // 因此这个remove方法可能只会删除最后一个节点，而且之后会报错
                // // 主要问题在于 如何从一个节点中获得treasure的id等唯一标识信息，从脚本中进行赋值应当是不够的
                treasureControl.removeFromWorld();
               
            }
        })

        // this.node.getComponent("treasureOnLoad").displayAllTreasureInStorage();
        // this.node.getComponent("treasureOnLoad").displayAllTreasureInOneWorld();

        // for test
    },

    FromStorageToWorld(){
        //从灵宝库向世界投放
        var storageTreasures = this.storageNode.children;
        storageTreasures.forEach(element => {
            var checkbox = element.getChildByName("灵宝-勾选图");
            if(checkbox.active){
                element.parent = this.worldNode;
                // this.node.parent  =  this.worldNode;
                treasureControl = element.getComponent("treasureControls");
                treasureControl.sendToWorld();
            }
        })
        // 重新显示一遍
        // this.node.getComponent("treasureOnLoad").displayAllTreasureInStorage();
        // this.node.getComponent("treasureOnLoad").displayAllTreasureInOneWorld();
    }

    // update (dt) {},
});
