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
        immortalImageNode: {
            default:null,
            type: cc.Node
        },
        devilImageNode: { //
            default:null,
            type: cc.Node
        },
        humanImageNode: {
            default:null,
            type: cc.Node
        },
        godImageNode: {
            default:null,
            type: cc.Node
        },
        ghostImageNode: {
            default:null,
            type: cc.Node
        },
        bogyImageNode: {
            default:null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //粒子特效
        this.immortalNode.active = true;
        this.devilNode.active = false;
        this.humanNode.active = false;
        this.godNode.active = false;
        this.ghostNode.active = false;
        this.bogyNode.active = false;
        //背景图片
        this.immortalImageNode.active = true;
        this.devilImageNode.active = false;
        this.humanImageNode.active = false;
        this.godImageNode.active = false;
        this.ghostImageNode.active = false;
        this.bogyImageNode.active = false;

        this.comfirmNode = cc.find("Canvas/确认弹窗");
        this.comfirmNode.active = false;

//         this.game = cc.find("game").getComponent("game");//game节点的game脚本
//         this.userData = this.game.userData;
        this.userData = cc.find("用户数据").getComponent("userData");//js脚本
        this.userData.currentWorld = "仙界";
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

            this.immortalImageNode.active = true;
            this.devilImageNode.active = false;
            this.humanImageNode.active = false;
            this.godImageNode.active = false;
            this.ghostImageNode.active = false;
            this.bogyImageNode.active = false;
            
            this.userData.currentWorld = "仙界";
            //console.log(this.userData.getCurrentWorld);
            }
     
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

            this.humanImageNode.active = true;
            this.devilImageNode.active = false;
            this.immortalImageNode.active = false;
            this.godImageNode.active = false;
            this.ghostImageNode.active = false;
            this.bogyImageNode.active = false;

            this.userData.currentWorld = "人界";
            // this.userData.setCurrentWorld("人界");
            //console.log(this.userData.getCurrentWorld);
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

                this.godImageNode.active = true;
                this.devilImageNode.active = false;
                this.immortalImageNode.active = false;
                this.humanImageNode.active = false;
                this.ghostImageNode.active = false;
                this.bogyImageNode.active = false;

            this.userData.currentWorld = "神界";

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

            this.ghostImageNode.active = true;
            this.devilImageNode.active = false;
            this.immortalImageNode.active = false;
            this.humanImageNode.active = false;
            this.godImageNode.active = false;
            this.bogyImageNode.active = false;
            
            this.userData.currentWorld = "冥界";

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

            this.bogyImageNode.active = true;
            this.devilImageNode.active = false;
            this.immortalImageNode.active = false;
            this.humanImageNode.active = false;
            this.godImageNode.active = false;
            this.ghostImageNode.active = false;

            this.userData.currentWorld = "妖界";
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

            this.devilImageNode.active = true;
            this.bogyImageNode.active = false;
            this.immortalImageNode.active = false;
            this.humanImageNode.active = false;
            this.godImageNode.active = false;
            this.ghostImageNode.active = false;

            this.userData.currentWorld = "魔界";
            }
    },

    // update (dt) {},
});
