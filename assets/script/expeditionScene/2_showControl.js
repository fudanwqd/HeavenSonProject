
cc.Class({
    extends: cc.Component,

    properties: {
        worldLabelNode:{
            default:null,
            type:cc.Node
        },

        worldBGNode:{
            default:null,
            type:cc.Node
        },

        initUnlockN:cc.Integer,
        leftNodesN:cc.Integer,

        worldBGs:{
            default:[],
            type:[cc.SpriteFrame]
        },

        //改成预制件
        leftNodePrefab : {
            default: null,
            type : cc.Prefab
         },

         //左侧父节点dishFatherNode
         leftFatherNode:{
            default:null,
            type:cc.Node
         }
    },

    // LIFE-CYCLE CALLBACKS:

    
    onLoad () {
        //全局持久化节点
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;

        //显示当前世界 名字 和 图片
        this.worldLabel = this.worldLabelNode.getComponent(cc.Label);
        this.worldLabel.string = this.userData.currentWorld;
        this.worldBGNode.getComponent(cc.Sprite).spriteFrame = this.worldBGs[this.userData.currentWorld];
        
        //解锁的槽位个数、槽位：状态（是否有某天道之子在历练:-1无，0~n代表天道之子身份id）（只存已解锁的值）、【数据存储+数据初始化】
        existData = cc.sys.localStorage.getItem("existData");
        if(existData=='true'){//已存在数据则读取
            this.unlockN = parseInt(cc.sys.localStorage.getItem('e_unlockN'));
            this.slotsData = JSON.parse(cc.sys.localStorage.getItem('slotsData'));
        }else{//不存在则新建初始化
            this.initData();
        }
        //当前槽位
        this.nowSlotI = 0;
        //渲染左侧栏
        this.showLeftBtns();

    },


    // update (dt) {},

    //显示左侧栏
    showLeftBtns(){
        for(let i=0;i<this.leftNodesN;i++){
            //创建新节点
            newLeftNode = cc.instantiate(this.leftNodePrefab);
            //挂载到父节点上，进行显示
            newLeftNode.parent = this.leftFatherNode;
            
            nNodeCtr = newLeftNode.getComponent("2_slot");
            if(i<this.unlockN){
                isunLocked = true;
                state = this.slotsData[i];
            }else{
                isunLocked = false;
                state = null;
            }
            nNodeCtr.init(i,isunLocked,state);//初始化，节点开始监听点击按钮
        }
    },


    //数据初始化
    initData(){
        //解锁的槽位个数、槽位：状态（是否有某天道之子在历练）（只存已解锁的值）
        this.unlockN = this.initUnlockN;
        cc.sys.localStorage.setItem('e_unlockN', this.initUnlockN);
        this.slotsData =[];
        for(let i=0;i<this.initUnlockN;i++){
            this.slotsData[i] = -1;
        }
        cc.sys.localStorage.setItem('slotsData', JSON.stringify(this.slotsData));
        //existData
        cc.sys.localStorage.setItem('existData', true);
    },


});
