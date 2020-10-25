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
         //主显示控制脚本的节点
         showCtrNode:{
            default:null,
            type:cc.Node
         },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //全局持久化节点
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        this.mainCtr = this.showCtrNode.getComponent("2_showControl");

        this.choosenSonNodeS = null;//当前选择的天道之子脚本
        this.sonArray = [];//当前选择的天道之子列表
    },

    // start () {},

    //渲染右侧（“全部”） 筛选模式
    showRight(filterMode){
        //获得玩家已拥有的所有天道之子集合
        allSons = this.game.getAllOwnedHeavenSons();
        
        this.sonArray = [];
        
        cc.log(filterMode);///
        if(filterMode=="全部"){
            this.sonArray = allSons;
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
        this.showRight("全部");
    },
    clickGods(){
        this.showRight("神界");
    },
    clickImmortals(){
        this.showRight("仙界");
    },
    clickHumans(){
        this.showRight("人界");
    },
    clickDemons(){
        this.showRight("魔界");
    },
    clickGhosts(){
        this.showRight("冥界");
    },
    clickBogys(){
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
            
            nNodeCtr = newLeftNode.getComponent("2_heavenSonItem");
            nNodeCtr.init(this.sonArray[i]);//初始化，节点开始监听点击按钮
            //默认第一个插槽，渲染右边
            if(i==0){
                nNodeCtr.touch();//相当于点了一下
                this.choosenSonNodeS = nNodeCtr;
            }
        }
        this.node.active = true;//显示
    },

    //按钮事件处理：确认使用当前天道之子进行历练
    chooseCurrentSon(){
        son = this.choosenSonNodeS.heavenSon;
        //设置历练信息条目,更改当前槽位显示
        this.mainCtr.addStartTime(son.heavenSonId);
        this.mainCtr.currentSlot.setNewSon(son);
    },

    //按钮事件处理：关闭“选择天道之子弹窗”
    closeChooseSonWin(){
        this.node.active = false;
    },

    // update (dt) {},
});
