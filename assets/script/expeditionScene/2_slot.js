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
    
    //监听 渲染右侧
    touch(){
        // this.cookCtrS.openSmallUI(this.dish);
    },

    // update (dt) {},
});
