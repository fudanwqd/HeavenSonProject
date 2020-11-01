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
        this.hp = 8;

        this.isHit = false;

        this.ani = this.node.getComponent(cc.Animation);
        this.ani.on("finished", event => {
            this.hp--;
            this.isHit = false;

            if(this.hp == 0){
                this.node.destroy();
            }
        }, this);
    },

    start () {

    },

    
    onCollisionEnter(other, self){
        if(other.node.group == "hero"){
            console.log("attacked! hp--");

            console.log(other.node.x);
            this.isHit = true;
            this.ani.play("enemyHurt");
        }
    }

    // update (dt) {},
});
