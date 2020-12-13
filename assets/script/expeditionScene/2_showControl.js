
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
        expeditionTimeUnit:cc.Integer,//每次历练的时长 以分钟为单位

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
         },

        //天道之子立绘节点
        heavenSonPNode:{
            default:null,
            type:cc.Node
         },
         //天道之子选择按钮节点
         chooseSonBtn:{
            default:null,
            type:cc.Node
         },
        //可收获示意节点
        harvestableNode:{
            default:null,
            type:cc.Node
         },
         //倒计时文本节点
         timeNode:{
            default:null,
            type:cc.Node
         }
    },

    // LIFE-CYCLE CALLBACKS:

    
    onLoad () {
        //全局持久化节点
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
        this.sfManager= cc.find("SFManager").getComponent("2_sfManager");
        this.bgmManager = cc.find("bgmManager").getComponent("2_bgmManager");

        //显示当前世界 名字 和 图片
        this.worldLabel = this.worldLabelNode.getComponent(cc.Label);
        this.worldLabel.string = this.userData.currentWorld;
        this.worldBGNode.getComponent(cc.Sprite).spriteFrame = this.worldBGs[this.userData.currentWorld];
        this.currentSonID = -1;//当前右侧天道之子的id，-1表示无
        this.currentSlot = null;//当前左侧插槽的slot脚本
        
        //解锁的槽位个数、槽位：状态（是否有某天道之子在历练:-1无，0~n代表天道之子身份id）（只存已解锁的值）、【数据存储+数据初始化】
        //历练信息：天道之子id-开始历练的时间（每次历练单位耗时设置定值）this.eStartTimes
        // cc.sys.localStorage.removeItem("e_existData");//删除
        existData = cc.sys.localStorage.getItem("e_existData");
        if(existData=='true'){//已存在数据则读取
            this.unlockN = parseInt(cc.sys.localStorage.getItem('e_unlockN'));

            //this.all_slotsData = {"神界":[slotsData],"仙界":[],...}
            this.all_slotsData = JSON.parse(cc.sys.localStorage.getItem('e_All_slotsData'));
            this.slotsData = this.all_slotsData[this.userData.currentWorld];

            // this.slotsData = JSON.parse(cc.sys.localStorage.getItem('e_slotsData'));
            this.eStartTimes =JSON.parse(cc.sys.localStorage.getItem('e_eStartTimes'));
            if(this.eStartTimes == null){
                this.eStartTimes = [];
            }
        }else{//不存在则新建初始化
            this.initData();
        }
        
        //当前槽位
        this.nowSlotI = 0;
        //渲染左侧栏
        this.showLeftBtns();
        //定时更新 每秒右侧刷新一次
        this.schedule(function() {
            // 这里的 this 指向 component
            if(!this.currentSlot.isEmpty){
                // i = this.currentSlot.heavenSon.heavenSonDemo.heavenSonDemoId;
                // sf = this.sfManager.staticImages[i];不用sf管理，用主界面的数据
                sf = this.currentSlot.heavenSon.heavenSonDemo.staticImage;
            }else{
                sf = null;
            }
            this.showRight(this.currentSlot.isEmpty,this.currentSonID,sf);
        }, 1);
        this.bgmManager.playBGM();
    },



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
            nNodeCtr.init(i,isunLocked,state,i);//初始化，节点开始监听点击按钮
            //默认第一个插槽，渲染右边
            if(i==0){
                nNodeCtr.touch();//相当于点了一下
                this.currentSonID = state;
            }
        }
    },

    //显示右侧 立绘（未解锁不会触发）
    showRight(isEmpty,heavenSonID,heavenSonSF){
        //点击，渲染右侧(立绘/选择按钮（启用/禁用）+收获区（底图+粒子特效 开启）)，
        //空、有天道之子在历练
        if(isEmpty){
            //渲染立绘
           this.heavenSonPNode.opacity = 0;//透明度设为0隐藏
           //选择按钮启用active
           this.chooseSonBtn.active = true;
           //不可收获
           this.harvestableNode.active =false;
           this.timeNode.active = false;

       }else{
           //渲染立绘
           //获得该天道之子的
           this.heavenSonPNode.getComponent(cc.Sprite).spriteFrame = heavenSonSF;
           this.heavenSonPNode.opacity = 255;//显示
           //选择按钮启用禁用
           this.chooseSonBtn.active = false;
           //harvestableNode
           //判断是否历练结束可收获
           if(this.timeIsReach(heavenSonID)){
               this.harvestableNode.active =true;
           }else{//不可收获
               this.harvestableNode.active =false;
           }
           this.showLeftTime();//更新，收获倒计时
       }
       this.currentSonID = heavenSonID;
    },

    //显示倒计时
    showLeftTime(){
        passedTime = this.getPassedTime(this.currentSonID);
        if(passedTime.second==0){
            leftSecond = 0;
            leftMinute = this.expeditionTimeUnit - passedTime.minute;
        }else{
            leftSecond = 60-passedTime.second;
            leftMinute = this.expeditionTimeUnit - passedTime.minute-1;
        }
        leftSecond = Math.round(leftSecond);
        if(leftMinute>=this.expeditionTimeUnit || leftMinute<0){
            s = '结束历练'
        }else{
            if(leftMinute<10){
                leftMinute = "0"+leftMinute;
            }
            if(leftSecond<10){
                leftSecond = "0"+leftSecond;
            }
            s = leftMinute + ':' + leftSecond;
        }
        
        this.timeNode.getComponent(cc.Label).string =s;
        this.timeNode.active =true;
    },


    //历练信息：天道之子id-开始历练的时间（每次历练单位耗时设置定值）this.eStartTimes 
    //测试
        // this.addStartTime(1);
        // cc.log("是否已经历练结束："+this.timeIsReach(1));
        // this.deleteStartTime(1);
    //新增一个条目
    addStartTime(childID){
        slotI = this.currentSlot.slotI;
        this.slotsData[slotI] = childID;
        //this.all_slotsData = {"神界":[slotsData],"仙界":[],...}
        this.all_slotsData[this.userData.currentWorld] = this.slotsData;
        cc.sys.localStorage.setItem('e_All_slotsData', JSON.stringify(this.all_slotsData));
        // cc.sys.localStorage.setItem('e_slotsData', JSON.stringify(this.slotsData));
        this.eStartTimes[childID] = new Date();
        cc.sys.localStorage.setItem('e_eStartTimes', JSON.stringify(this.eStartTimes));//存档
    },
    //移除一个条目
    deleteStartTime(childID){
        slotI = this.currentSlot.slotI;
        this.slotsData[slotI] = -1;
        this.all_slotsData[this.userData.currentWorld] = this.slotsData;
        cc.sys.localStorage.setItem('e_All_slotsData', JSON.stringify(this.all_slotsData));
        // cc.sys.localStorage.setItem('e_slotsData', JSON.stringify(this.slotsData));
        // cc.sys.localStorage.setItem('e_slotsData', JSON.stringify(this.slotsData));
        delete this.eStartTimes[childID];
        cc.sys.localStorage.setItem('e_eStartTimes', JSON.stringify(this.eStartTimes));//存档
    },
    //计算时间是否到了
    timeIsReach(childID){
        // startTime = this.eStartTimes[childID]//获得开始时间的记录
        // if(typeof(startTime) =='string'){//如果是字符串形式则转为Date
        //     startTime = Date.parse(startTime);
        // }
        // nowTime = new Date();
        // timespan = nowTime - startTime;
        // hour = Math.floor(timespan / 1000 / 60 / 60);
        // minute = Math.floor(timespan / 1000 / 60 - hour * 60);
        minute = this.getPassedTime(childID).minute;
        if(minute>=this.expeditionTimeUnit){
            return true;
        }else{
            return false;
        }
    },

    //计算时间 {'minute':minute,'second':second}
    getPassedTime(childID){
        startTime = this.eStartTimes[childID]//获得开始时间的记录
        if(typeof(startTime) =='string'){//如果是字符串形式则转为Date
            startTime = Date.parse(startTime);
        }
        nowTime = new Date();
        timespan = nowTime - startTime;
        hour = Math.floor(timespan / 1000 / 60 / 60);
        minute = Math.floor(timespan / 1000 / 60 - hour * 60)+hour * 60;
        second = timespan / 1000 - hour * 60 * 60 - minute * 60;
        return {'minute':minute,'second':second};
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
        
        //this.all_slotsData = {"神界":[slotsData],"仙界":[],...}
        all_slotsData = {};
        all_slotsData["神界"] = this.slotsData;
        all_slotsData["仙界"] = this.slotsData;
        all_slotsData["人界"] = this.slotsData;
        all_slotsData["魔界"] = this.slotsData;
        all_slotsData["冥界"] = this.slotsData;
        all_slotsData["妖界"] = this.slotsData;

        cc.sys.localStorage.setItem('e_All_slotsData', JSON.stringify(all_slotsData));
        // cc.sys.localStorage.setItem('e_slotsData', JSON.stringify(this.slotsData));

        //空的历练列表
        this.eStartTimes = [];
        cc.sys.localStorage.setItem('e_eStartTimes', JSON.stringify(this.eStartTimes));
        //existData
        cc.sys.localStorage.setItem('e_existData', true);
    },


});
