// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        //...
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //全局持久化节点
        this.game = cc.find("game").getComponent("game");//game节点的game脚本
        this.userData = this.game.userData;
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
                if(allSons[i].worldType==filterMode){
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


    //根据当前天道之子列表，生成右侧Items
    showHeavenSonByIDList(){
        //..
    }

    // update (dt) {},
});
