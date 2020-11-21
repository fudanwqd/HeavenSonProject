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


    onLoad () {
        this.havenSon = this.node.parent.getComponent('havenSon');
    },

    start () {

    },

    // update (dt) {},

    onCollisionEnter(other, self){
        if(other.node.group == "enemy" && other.tag <= 1 && other.tag > 0){
            // this.havenSon.hurt();
            console.log("人物受伤， 碰撞体： ", other);
            this.havenSon.hurt(other);
        }
    },

    onCollisionStay(other, self){
        if(other.node.group == "enemy" && other.tag <= 1 && other.tag > 0){
            // console.log("人物受伤触发");
            // console.log(other.tag);
            // console.log(self.tag);
            console.log("人物受伤， 碰撞体： ", other);
            this.havenSon.hurt(other);
        }
    }
});