// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        lockedSF: {
                default: null,       
                type: cc.SpriteFrame, 
        },
        emptySF: {
            default: null,       
            type: cc.SpriteFrame, 
        },
    },

    // state=-1为空，其他值为身份id
    init(i,isunLocked,state){
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.HeavenSonDB = this.game.HeavenSonDB;
        this.heavenSonPNode= cc.find("Canvas/显示/渲染历练的天道之子们区域/历练中的天道之子（待图）");//天道之子立绘节点
        this.chooseSonBtn = cc.find("Canvas/显示/渲染历练的天道之子们区域/选择天道之子进行历练按钮");//天道之子选择按钮节点
        this.harvestableNode = cc.find("Canvas/显示/渲染历练的天道之子们区域/历练可收获（待图）");//可收获示意节点
        this.showControl = cc.find("Canvas/显示").getComponent("2_showControl");//获得控制脚本

        // this.isEmpty
        //this.heavenSon

        this.i = i;
        //是否解锁
        if(isunLocked){//解锁
            //是否插槽为空
            if(state==-1){
                this.isEmpty = true;
                this.getComponent(cc.Sprite).spriteFrame = this.emptySF;
            }else{//有天道之子在历练
                this.isEmpty = false;
                //获得该天道之子的头像
                this.heavenSon = this.game.getChildbyID(state);
                this.getComponent(cc.Sprite).spriteFrame = this.heavenSon.e_headPortrait;
            }
            this.node.on('touchstart', this.touch, this);//监听点击
        }else{
            //未解锁
            this.getComponent(cc.Sprite).spriteFrame = this.lockedSF;
        }
    },
    
    //监听 渲染右侧（未解锁不会触发）
    touch(){
        if(this.isEmpty){
            this.heavenSon={};
            this.heavenSon.heavenSonId = -1;
            this.heavenSon.staticImage = null;
        }
        this.showControl.showRight(this.isEmpty,this.heavenSon.heavenSonId,this.heavenSon.staticImage);
        this.showControl.currentSlot = this;
    },

    //重新渲染该插槽按钮（空→历练中）（待扩展：历练中→历练结束可收获）
    setNewSon(childID){
        //...
    },

    //重新渲染该插槽按钮（→空）
    setEmpty(){
        //...
    }

    
    // update (dt) {
    //     //判断是否有更改（空）（待扩展：历练中→历练结束可收获）
    // },
});
