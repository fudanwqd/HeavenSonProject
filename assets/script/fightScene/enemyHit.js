// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.enemy = this.node.parent.getComponent('enemy');
    },

    start () {

    },

    // update (dt) {},

    onCollisionEnter(other, self){
        if(other.node.group == "hero" && other.tag <= 1 && other.tag > 0){
            // console.log("怪物受伤触发");
            // console.log(other.tag);
            // console.log(self.tag);
            this.enemy.hurt();
        }
    },

    onCollisionStay(other, self){        
        // if(other.node.group == "hero" && other.tag <= 1 && other.tag > 0){
        //     console.log("怪物受伤触发");
        //     console.log(other.tag);
        //     console.log(self.tag);
        //     this.enemy.hurt();
        // }
    }
});
