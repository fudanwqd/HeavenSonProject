// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const State = {
    stand : 1,
    attack : 2,
    hurt : 3,
    walk : 4,
}


cc.Class({
    extends: cc.Component,

    properties: {
        // HP:{
        //     type : cc.ProgressBar,
        //     default: null,
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hp = 50;
        this.totalHP = 50;
        this.power = 10;
        this.defend = 10;


        this.hpProgress = this.node.getChildByName('hp');
        this.playerNode = cc.find('Canvas/bg/hero');//拿到节点
        this.havenSon = this.playerNode.getComponent('havenSon');

        this.isHit = false;
        this.bg = this.node.parent.parent.getComponent('fight_game');

        this.enemyAni = this.node.getChildByName('body').getComponent(cc.Animation);
        this.enemyAni.on("finished", (e, data) => {
            if(data.name == 'enemyHurt' && this.tag != 1){
                // console.log("扣血");
                if(this.defend >= this.havenSon.power){
                    this.hp--;
                }else{
                    this.hp -= this.havenSon.power - this.defend;
                }
                
                this.isHit = false;                
                
                // console.log(this.hp / this.totalHP);
                if(this.hp <= 0){
                    this.bg.isIniEnemy = false;
                    this.node.destroy();
                }else{
                    this.hpProgress.getComponent(cc.ProgressBar).progress = this.hp / this.totalHP;
                }
            }else if(data.name == 'enemyAttack'){
                this.setAni("enemyIdle");
            }

            this.enemyState = State.stand;
            
        });


        this.ani = 'enemyIdle';
        this.rb = this.node.getComponent(cc.RigidBody);
        this._speed = 100;
        this.sp = cc.v2(0, 0);
        this.tt = 0;
        this.enemyState = State.stand;

        this.moveLeft = false;
        this.moveRight = false;


        
    },

    start () {

    },

    
    hurt(){
        // console.log("怪物受伤");
        if(this.isHit){
            return ; 
        }
        this.isHit = true;
        this.enemyState = State.hurt;

        this.lv = this.rb.linearVelocity;
        this.lv.x = 0;
        this.rb.linearVelocity = this.lv;

        this.setAni("enemyHurt");
    },


    enemyAction(tt){
        let p_pos= this.playerNode.position;
        let e_pos = this.node.position;

        let dis = cc.Vec2.distance(e_pos, p_pos);

        if(dis <= 30){//攻击距离
            // console.log("attack");
            
            this.moveLeft = false;
            this.moveRight = false;

            this.enemyState = State.attack;
        }else if(dis <= 500){//追击距离
            // console.log("find");


            let v = p_pos.sub(e_pos);
            if(v.x < 0){//向左移动
                this.moveLeft = true;
                this.moveRight = false;
            }else{//向右移动
                this.moveLeft = false;
                this.moveRight = true;
            }
            this.enemyState = State.stand;
        }else{//不动
            // console.log("stand");

            this.moveLeft = false;
            this.moveRight = false;
            this.enemyState = State.stand;
        }
        
    },

    attack(){
        this.setAni("enemyAttack");
        this.lv = this.rb.linearVelocity;
        this.lv.x = 0;
        this.rb.linearVelocity = this.lv;
    },

    move(){
        let scaleX = Math.abs(this.node.scaleX);
        this.lv = this.rb.linearVelocity;
        if(this.moveLeft){
            this.sp.x = -1;
            this.node.scaleX = scaleX;
            this.setAni('enemyWalk');
        }else if(this.moveRight){
            this.sp.x = 1;
            this.node.scaleX = -scaleX;
            this.setAni('enemyWalk');
        }else{
            this.sp.x = 0;
            this.setAni('enemyIdle');
        }

        if(this.sp.x){
            this.lv.x = this.sp.x * this._speed;
        }else{
            this.lv.x = 0;
        }

        this.rb.linearVelocity = this.lv;
    },

    update (dt) {
       this.tt += dt;

       if(this.tt >= 0.3 && this.enemyState == State.stand){
            this.enemyAction(dt);
            this.tt = 0;
       }

       if(this.enemyState == State.attack){
            this.attack();
       }else if(this.enemyState == State.stand){
            this.move();
       }

        
    },

    setAni(ani){
        if(this.ani == ani){
            return;
        }
        
        this.ani = ani;
        this.playAni();
    },


    playAni(){
        this.enemyAni.play(this.ani);
    },


});
