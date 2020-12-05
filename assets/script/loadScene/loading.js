cc.Class({
    extends: cc.Component,

    properties: {

        loading:{
            default:null,
            type:cc.ProgressBar
        },
        loadLabel:{
            default:null,
            type:cc.Label
        },
    },

    onLoad(){
        
        cc.director.preloadScene("mainScene", this.onProgress.bind(this), function(){    
            cc.log("加载成功");
            cc.director.loadScene("mainScene");
        });

    },

    onProgress(completedCount, totalCount, item){
        this.loading.progress = completedCount/totalCount;
        this.loadLabel.string = Math.floor(completedCount/totalCount * 100) + "%";
    }
        
});