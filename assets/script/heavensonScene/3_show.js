// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //item预制件
        heavenSonItemPrefab : {
            default: null,
            type : cc.Prefab
         },
         //左侧父节点
         heavenSonItemFatherNode:{
            default:null,
            type:cc.Node
         },
         //详情弹窗
         heavenSonDetailsNode:{
            default:null,
            type:cc.Node
         },
         DsonNameLabelNode:{
            default:null,
            type:cc.Node
         },
         DsongrowLabelNode:{
            default:null,
            type:cc.Node
         },
         DsontypeLabelNode:{
            default:null,
            type:cc.Node
         },
         DsonLevelLabelNode:{
            default:null,
            type:cc.Node
         },
         DsonAttackLabelNode:{
            default:null,
            type:cc.Node
         },
         DsonDefendLabelNode:{
            default:null,
            type:cc.Node
         },
         DsonHPLabelNode:{
            default:null,
            type:cc.Node
         },
         DsonImageNode:{
            default:null,
            type:cc.Node
         },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //全局持久化节点
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        this.bgmManager = cc.find("Canvas/BGMManager").getComponent("3_bgmManager");

        this.choosenSonNodeS = null;//当前选择的天道之子脚本
        this.sonArray = [];//当前选择的天道之子列表

        this.clickAll();//初始显示所有

        this.detailSon =null;//当前显示详情的天道之子
    },

    //渲染右侧（“全部”） 筛选模式
    showRight(filterMode){
        //清空右侧
        this.clearRight();
        //获得玩家已拥有的所有天道之子集合
        allSons = this.userData.getAllOwnedHeavenSons();
        this.sonArray = [];
        
        cc.log(filterMode);///
        if(filterMode=="全部"){
            for(let i =0;i<allSons.length;i++){
                this.sonArray.push(allSons[i]);
            }
        }else{
            for(let i =0;i<allSons.length;i++){
                if(allSons[i].heavenSonDemo.worldType==filterMode){
                    this.sonArray.push(allSons[i]);
                }
            }
        }
        
        this.showHeavenSonByIDList();
    },

    //按钮处理事件
    clickAll(){
        this.bgmManager.playBtnClickM();//playBGM()
        this.showRight("全部");
    },
    clickGods(){
        this.bgmManager.playBtnClickM();//playBGM()
        this.showRight("神界");
    },
    clickImmortals(){
        this.bgmManager.playBtnClickM();//playBGM()
        this.showRight("仙界");
    },
    clickHumans(){
        this.bgmManager.playBtnClickM();//playBGM()
        this.showRight("人界");
    },
    clickDemons(){
        this.bgmManager.playBtnClickM();//playBGM()
        this.showRight("魔界");
    },
    clickGhosts(){
        this.bgmManager.playBtnClickM();//playBGM()
        this.showRight("冥界");
    },
    clickBogys(){
        this.bgmManager.playBtnClickM();//playBGM()
        this.showRight("妖界");
    },


    //根据当前天道之子列表，生成右侧Items并且init()
    showHeavenSonByIDList(){
        //根据当前天道之子列表，生成右侧Items
        for(let i=0;i<this.sonArray.length;i++){
            //创建新节点
            newNode = cc.instantiate(this.heavenSonItemPrefab);
            //挂载到父节点上，进行显示
            newNode.parent = this.heavenSonItemFatherNode;
            
            nNodeCtr = newNode.getComponent("3_heavensonItem");
            nNodeCtr.init(this.sonArray[i]);//初始化，节点开始监听点击按钮
        }
    },

    //清空右侧
    clearRight(){
        let children = this.heavenSonItemFatherNode.children;
        for (let i = children.length-1 ; i >=0; i--) {//从后往前删，以防万一实时更新
            let itemNode = children[i];
            itemNode.destroy();
        }
    },

    //显示天道之子详情
    showHeavonSonDetails(son){
        this.bgmManager.playBtnClickM();
        
        this.DsonNameLabelNode.getComponent(cc.Label).string = son.name;
        this.DsongrowLabelNode.getComponent(cc.Label).string = son.growRate;
        this.DsontypeLabelNode.getComponent(cc.Label).string = son.heavenSonDemo.worldType;
        this.DsonLevelLabelNode.getComponent(cc.Label).string = son.level;
        this.DsonAttackLabelNode.getComponent(cc.Label).string = son.power;
        this.DsonDefendLabelNode.getComponent(cc.Label).string = son.defend;
        this.DsonHPLabelNode.getComponent(cc.Label).string = son.HP;
        this.DsonImageNode.getComponent(cc.Sprite).spriteFrame =son.heavenSonDemo.staticImage;

        this.detailSon = son;

        this.heavenSonDetailsNode.active = true;
    }


    // update (dt) {},
});
