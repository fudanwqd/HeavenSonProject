


const State = {
    stand: 1,
    attack: 2,
    jump: 3,
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
        }
    },
    

    onLoad () {
        this._speed = 100;
        this.sp = cc.v2(0, 0);
        this.havenSonState = State.stand;
        this.ani = "heroIdle";

        this.heroAni = this.node.getComponent(cc.Animation);
    

        this.attackBtn.on(cc.Node.EventType.TOUCH_START, event => {
            this.setAni("heroAttack"); 
            this.havenSonState = State.attack
        }, this);

        this.heroAni.on("finished", event => {
            this.setAni("heroIdle");
            this.havenSonState = State.stand
        }, this);

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
        if(this.havenSonState == State.attack){
            this.setAni("heroAttack");
        }else{
            //站立状态
            if(this.havenSonState == State.stand){
                let face_speed = 0;
                if(this.Rocker.dir.x < 0){
                    face_speed = -1;
                }else if(this.Rocker.dir.x > 0){
                    face_speed = 1;
                }
                var vx = face_speed * this._speed;
                var sx = vx * dt;            

                if(sx < 0){
                    this.node.scaleX = -1;
                    this.setAni("heroRun");
                }else if(sx > 0){
                    this.node.scaleX = 1;
                    this.setAni("heroRun");
                }else{
                    this.setAni("heroIdle");
                }
                //移动
                this.node.x += sx;
                    
                var minX = -cc.visibleRect.width / 2 + 42;
                var maxX = cc.visibleRect.width / 2 - 42;
                if (this.node.x < minX) {
                    this.node.x = minX;
                } else if (this.node.x > maxX) {
                    this.node.x = maxX;
                }
            }
        }
    }
});
