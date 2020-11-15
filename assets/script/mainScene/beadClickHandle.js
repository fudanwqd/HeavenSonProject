// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        immortalNode: { //仙界珠子节点，以下类推
            default:null,
            type: cc.Node
        },
        devilNode: { //魔界珠子
            default:null,
            type: cc.Node
        },
        humanNode: {
            default:null,
            type: cc.Node
        },
        godNode: {
            default:null,
            type: cc.Node
        },
        ghostNode: {
            default:null,
            type: cc.Node
        },
        bogyNode: {
            default:null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.immortalNode.active = true;
        this.devilNode.active = false;
        this.humanNode.active = false;
        this.godNode.active = false;
        this.ghostNode.active = false;
        this.bogyNode.active = false;

        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        // this.userData.currentWorld = "仙界";
    },

    clickImmortalsHandele(){//点击仙界珠子
        
        if(!this.immortalNode.active && (this.devilNode.active || this.humanNode.active || 
            this.godNode.active ||this.ghostNode.active ||this.bogyNode.active)){
            this.immortalNode.active = true;

            this.devilNode.active = false;
            this.humanNode.active = false;
            this.godNode.active = false;
            this.ghostNode.active = false;
            this.bogyNode.active = false;
            // this.userData.currentWorld = "仙界";
            //cc.log(this.userData.getCurrentWorld);
            }
            
       // cc.log("click immortal");//log会影响按钮音效
    },

    clickHumansHandele(){//点击人界珠子
        
        if(!this.humanNode.active && (this.immortalNode.active || this.devilNode.active || 
            this.godNode.active ||this.ghostNode.active ||this.bogyNode.active)){
                this.humanNode.active = true;

                this.immortalNode.active = false;
            this.devilNode.active = false;
            this.godNode.active = false;
            this.ghostNode.active = false;
            this.bogyNode.active = false;

            // this.userData.currentWorld = "人界";
            // this.userData.setCurrentWorld("人界");
            //cc.log(this.userData.getCurrentWorld);
            }      
    },

    clickGodsHandele(){//点击神界珠子
        if(!this.godNode.active && (this.immortalNode.active || this.devilNode.active || 
            this.humanNode.active ||this.ghostNode.active ||this.bogyNode.active)){
                this.godNode.active = true;

                this.immortalNode.active = false;
            this.devilNode.active = false;
            this.humanNode.active = false;
            this.ghostNode.active = false;
            this.bogyNode.active = false;

            // this.userData.setCurrentWorld("神界");
            }      
    },

    clickGhostsHandele(){//点击冥界珠子
        if(!this.ghostNode.active && (this.immortalNode.active || this.devilNode.active || 
            this.humanNode.active ||this.godNode.active ||this.bogyNode.active)){
                this.ghostNode.active = true;

                this.immortalNode.active = false;
            this.devilNode.active = false;
            this.humanNode.active = false;
            this.godNode.active = false;
            this.bogyNode.active = false;

            // this.userData.setData("worldType","冥界");
            }      
    },

    clickBogysHandele(){//点击妖界珠子
        if(!this.bogyNode.active && (this.immortalNode.active || this.devilNode.active || 
            this.humanNode.active ||this.godNode.active ||this.ghostNode.active)){
                this.bogyNode.active = true;

                this.immortalNode.active = false;
            this.devilNode.active = false;
            this.humanNode.active = false;
            this.godNode.active = false;
            this.ghostNode.active = false;
            }      
    },

    clickDevilHandle() {//点击魔界珠子
        if(!this.devilNode.active && (this.immortalNode.active || this.humanNode.active || 
            this.godNode.active ||this.ghostNode.active ||this.bogyNode.active)){
                this.devilNode.active = true;

                this.immortalNode.active = false;
            this.humanNode.active = false;
            this.godNode.active = false;
            this.ghostNode.active = false;
            this.bogyNode.active = false;
            }
                

        //var node = cc.find("Canvas/魔/魔界按钮", canvas);
        //var particle = this.getComponent(cc.ParticleSystem);
        //var tag = particle.active;
        //cc.log();
        // if(!tag){
        //     tag = true;
        // }
        //else tag = false;

        //cc.log("应该杀死所有粒子");
        // var devil =  cc.find("魔/魔界按钮/atom", this.node);
        // devil.active = true;
        //this.node.getChildByName("button 01").active = true;
        //this.node.active = false;
    },

    // update (dt) {},
});
