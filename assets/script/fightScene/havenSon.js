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
        },

        attackAudio:{
            default : null,
            type : cc.AudioClip,
        },

        hurtAudio:{
            default : null,
            type : cc.AudioClip,
        }, 

        runAudio:{
            default : null,
            type : cc.AudioClip,
        }, 

        // Audio:{
        //     default : null,
        //     type : cc.AudioClip,
        // }, 

        
    },
    

    onLoad () {
        this._speed = 600;
        this.sp = cc.v2(0, 0);
        this.havenSonState = State.stand;
        
        this.isHit = false;
        this.rb = this.node.getComponent(cc.RigidBody);
        this.bg = cc.find('Canvas/bg').getComponent('fight_game');
        this.havenSonInstance = this.bg.havenSonInstance;
        let id = this.havenSonInstance.heavenSonId % 2 + 1;
        this.aniName = {
            idle : "heroIdle" + id,
            run : "heroRun" + id,
            attack : "heroAttack" + id,
            hurt : "heroHurt" + id,
            dead : "heroDead" + id,
        };
        this.ani = "";

        this.heroAni = this.node.getChildByName('body').getComponent(cc.Animation);
        this.setAni(this.aniName.idle);

        // 用户数据
        this.game = cc.find('game').getComponent('game');
        this.userData = this.game.userData;        
        this.name = this.havenSonInstance.name;

        this.totalHP = this.havenSonInstance.HP;
        this.power = this.havenSonInstance.power;
        this.defend = this.defend;
        this.hp = this.totalHP;

        // 设置更新用户的属性
        this.treasures = this.havenSonInstance.ownTreasures;
        this.treasures.forEach(element => {
            this.totalHP += element.HP;
            this.power += element.power;
            this.defend += element.defend;
            this.hp = this.totalHP;
        });

        this.iniShowErea();

        console.log('HP: ', this.totalHP, '; power: ', this.power, '; defend: ', this.defend);
        
        
        this.attackBtn.on(cc.Node.EventType.TOUCH_START, event => {
            this.setAni(this.aniName.attack); 
            this.havenSonState = State.attack;
            cc.audioEngine.play(this.attackAudio, false, 1);
        }, this);

        this.heroAni.on("finished", (e, data) => {
            if(data.name == this.aniName.hurt && this.tag != 1){
                console.log("human hurt");
          
                var colliderTemp = cc.director.getPhysicsManager().testPoint(this.other);
                var enemyNode = colliderTemp.body.node;

                if(cc.isValid(enemyNode)){
                    // console.log(enemyNode);
                    var enemy = enemyNode.getComponent('enemy');
                    // console.log(enemy);
                    if(cc.isValid(enemyNode)){
                        if(this.defend >= enemy.power){
                            // console.log('未破防！');
                            this.hp--;
                        }else{
                            this.hp -= enemy.power - this.defend;
                        }
                    }

                    this.isHit = false;
                    this.hpProgress.getComponent(cc.ProgressBar).progress = this.hp / this.totalHP;
                    
                    if(this.hp <= 0){
                        this.node.destroy();
                        console.log('failed! ');
                        this.bg.showFailPage();
                    }
                }
            }

            this.setAni(this.aniName.idle);
            this.havenSonState = State.stand;
            this.isHit = false;
        }, this);
    },

    iniShowErea(){
        this.show = cc.find('Canvas/bg/show');
        let name = this.show.getChildByName('name').getComponent(cc.Label);
        this.hpLabel = this.show.getChildByName('hp').getChildByName('hp').getComponent(cc.Label);
        let totalHPLabel = this.show.getChildByName('hp').getChildByName('totalHP').getComponent(cc.Label);
       
        
        name.string = this.name;
        this.hpLabel.string = this.hp;
        totalHPLabel.string = this.totalHP;
        
        let header = this.show.getChildByName('header').getChildByName('header');
        var url = 'imgs/' + this.name;
        cc.resources.load(url,cc.SpriteFrame,function(err,spriteFrame)
    　　{
            header.getComponent(cc.Sprite).spriteFrame = spriteFrame;
    　　});
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
            this.setAni(this.aniName.attack);
        }else{
            //站立状态
            if(this.havenSonState == State.stand){
                this.lv = this.rb.linearVelocity;

                if(this.Rocker.dir.x < 0){
                    this.sp.x = -1;
                    this.node.scaleX = -1;
                    this.setAni(this.aniName.run);
                }else if(this.Rocker.dir.x > 0){
                    this.sp.x = 1;
                    this.node.scaleX = 1;
                    this.setAni(this.aniName.run);
                }else{
                    this.sp.x = 0;
                    this.setAni(this.aniName.idle);
                }


                if(this.sp.x){
                    this.lv.x = this.sp.x * this._speed;
                    // cc.audioEngine.play(this.runAudio, false, 1); // 行走的音效太魔性了
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
        this.other = other;
        this.isHit = true;
        this.havenSonState = State.hurt;

        this.lv = this.rb.linearVelocity;
        this.lv.x = 0;
        this.rb.linearVelocity = this.lv;
        cc.audioEngine.play(this.hurtAudio, false, 1);
        this.setAni(this.aniName.hurt);
    },
});
