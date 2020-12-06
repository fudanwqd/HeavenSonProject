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

    // state=-1为空，其他值为身份id,slotI:当前槽位的序号
    init(i,isunLocked,state,slotI){
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.HeavenSonDB = this.game.HeavenSonDB;
        this.heavenSonPNode= cc.find("Canvas/显示/渲染历练的天道之子们区域/历练中的天道之子（待图）");//天道之子立绘节点
        this.chooseSonBtn = cc.find("Canvas/显示/渲染历练的天道之子们区域/选择天道之子进行历练按钮");//天道之子选择按钮节点
        this.harvestableNode = cc.find("Canvas/显示/渲染历练的天道之子们区域/历练可收获（待图）");//可收获示意节点
        this.showControl = cc.find("Canvas/显示").getComponent("2_showControl");//获得控制脚本
        this.nameNode =this.node.getChildByName("名字");
        this.sfManager= cc.find("SFManager").getComponent("2_sfManager");
        this.bgmManager = cc.find("bgmManager").getComponent("2_bgmManager");
        this.slotI = slotI;

        // this.isEmpty
        //this.heavenSon

        this.i = i;
        this.nameNode.active = false;//先隐藏名字节点

        //是否解锁
        if(isunLocked){//解锁
            this.getComponent(cc.Sprite).spriteFrame = this.emptySF;
            //是否插槽为空
            if(state==-1){
                this.isEmpty = true;
            }else{//有天道之子在历练
                this.isEmpty = false;
                //获得该天道之子的名字
                this.heavenSon = this.game.userData.getChildByID(state);
                this.nameNode.getComponent(cc.Label).string = this.heavenSon.name;
                this.nameNode.active = true;//有则开启
            }
            this.node.on('touchstart', this.touch, this);//监听点击
        }else{
            //未解锁
            this.getComponent(cc.Sprite).spriteFrame = this.lockedSF;
        }
    },
    
    //监听 渲染右侧（未解锁不会触发）
    touch(){
        this.bgmManager.playBtnClickM();//playBGM()
        if(this.isEmpty){
            this.heavenSon={};
            this.heavenSon.heavenSonId = -1;
            this.heavenSon.staticImage = null;
            sf = null;
            this.showControl.timeNode.active =false;
        }else{
            // i = this.heavenSon.heavenSonDemo.heavenSonDemoId;
            // sf = this.sfManager.staticImages[i];不用sf管理，用主界面的数据
            sf = this.heavenSon.heavenSonDemo.staticImage;
            this.showControl.showLeftTime();//更新，收获倒计时
        }

        this.showControl.showRight(this.isEmpty,this.heavenSon.heavenSonId,sf);
        this.showControl.currentSlot = this;
    },

    //重新渲染该插槽按钮（空→历练中）（待扩展：历练中→历练结束可收获）
    setNewSon(son){
        this.isEmpty = false;
        //获得该天道之子的头像
        this.heavenSon = son;
        this.showControl.currentSonID = son.heavenSonId;
        this.nameNode.getComponent(cc.Label).string = this.heavenSon.name;
        this.nameNode.active = true;//有则开启
    },

    //重新渲染该插槽按钮（→空）
    setEmpty(){
        this.isEmpty = true;
        this.getComponent(cc.Sprite).spriteFrame = this.emptySF;
        this.heavenSon={};
        this.heavenSon.heavenSonId = -1;
        this.heavenSon.staticImage = null;
        this.nameNode.active = false;//隐藏名字节点
    }

    
    // update (dt) {
    //     //判断是否有更改（空）（待扩展：历练中→历练结束可收获）
    // },
});
