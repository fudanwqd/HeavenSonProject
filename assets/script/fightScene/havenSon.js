


const State = {
    stand: 1,
    attack: 2,
    jump: 3,
    hurt : 4,
};


cc.Class({
    extends: cc.Component,

    properties: {
        Rocker:{
            type:require("Rocker"),
            default:null,
        },

        attackBtn:{
            type:cc.Node,
            default:null,
        },

        hpProgress:{
            type: cc.ProgressBar,
            default: null,
        }

        
    },
    

    onLoad () {
        this._speed = 300;
        this.sp = cc.v2(0, 0);
        this.havenSonState = State.stand;
        this.ani = "heroIdle";
        this.isHit = false;
        this.rb = this.node.getComponent(cc.RigidBody);
        // this.hpProgress = this.node.getChildByName('hp');

        this.heroAni = this.node.getChildByName('body').getComponent(cc.Animation);
        


        this.game = cc.find('game').getComponent('game');
        this.userData = this.game.userData;
        this.havenSonInstance = this.userData.sons[0];
        this.name = this.havenSonInstance.name;

        // 设置更新用户的属性
        this.treasures = this.havenSonInstance.ownTreasures;
        this.treasures.forEach(element => {
            this.totalHP = this.havenSonInstance.HP + element.HP;
            this.power = this.havenSonInstance.power + element.power;
            this.defend = this.havenSonInstance.defend + element.defend;
            this.hp = this.totalHP;
        });

        this.iniShowErea();

        console.log('HP: ', this.totalHP, '; power: ', this.power, '; defend: ', this.defend);
        

        this.attackBtn.on(cc.Node.EventType.TOUCH_START, event => {
            this.setAni("heroAttack"); 
            this.havenSonState = State.attack;
        }, this);

        this.heroAni.on("finished", event => {
            this.setAni("heroIdle");
            this.havenSonState = State.stand;
            this.isHit = false;
        }, this);

    },

    iniShowErea(){
        this.show = cc.find('Canvas/bg/show');
        // console.log('show: ', this.show);
        let name = this.show.getChildByName('name').getComponent(cc.Label);
        this.hpLabel = this.show.getChildByName('hp').getChildByName('hp').getComponent(cc.Label);
        let totalHPLabel = this.show.getChildByName('hp').getChildByName('totalHP').getComponent(cc.Label);
       
        
        name.string = this.name;
        this.hpLabel.string = this.hp;
        totalHPLabel.string = this.totalHP;
        

        // console.log('name: ', name);
        // console.log('hpLabel: ', this.hpLabel);
        // console.log('totalHPLabel: ', totalHPLabel);
    },


    start () {

    },


    setAni(ani){
        if(this.ani == ani){
            return;
        }
        
        this.ani = ani;
        this.playAni();
    },


    playAni(){
        this.heroAni.play(this.ani);
    },




    update (dt) {
        this.hpLabel.string = this.hp;
        if(this.havenSonState == State.attack){
            this.setAni("heroAttack");
        }else{
            //站立状态
            if(this.havenSonState == State.stand){
                this.lv = this.rb.linearVelocity;

                if(this.Rocker.dir.x < 0){
                    this.sp.x = -1;
                    this.node.scaleX = -1;
                    this.setAni("heroRun");
                }else if(this.Rocker.dir.x > 0){
                    this.sp.x = 1;
                    this.node.scaleX = 1;
                    this.setAni("heroRun");
                }else{
                    this.sp.x = 0;
                    this.setAni("heroIdle");
                }


                if(this.sp.x){
                    this.lv.x = this.sp.x * this._speed;
                }else{
                    this.lv.x = 0;
                }
                this.rb.linearVelocity = this.lv;
            }
        }
    },

    hurt(other){
        // console.log('人物受伤');
        if(this.isHit){
            return ; 
        }
        this.isHit = true;
        this.havenSonState = State.hurt;

        this.lv = this.rb.linearVelocity;
        this.lv.x = 0;
        this.rb.linearVelocity = this.lv;

        
        //播放动画，暂无资源
        // this.setAni('heroHurt');


        //以下内容应该放到受伤动画完成后的监听上，目前的效果掉血太快，利用动画监听可以在受伤动画播放时有个小无敌，不会掉血
        this.havenSonState = State.stand;
        // this.hp -= 10;

        
        var colliderTemp = cc.director.getPhysicsManager().testPoint(other);
        var enemyNode = colliderTemp.body.node;
        // console.log(enemyNode);
        let enemy = enemyNode.getComponent('enemy');
        // console.log(enemy);
        if(this.defend >= enemy.power){
            // console.log('未破防！');
            this.hp--;
        }else{
            // console.log("human hurt");
            this.hp -= this.enemy.power - this.defend;
        }

        this.isHit = false;
        this.hpProgress.getComponent(cc.ProgressBar).progress = this.hp / this.totalHP;

    },
});
