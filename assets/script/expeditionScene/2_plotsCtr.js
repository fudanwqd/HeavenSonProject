
var Plot = cc.Class({
    name : "情节",
    properties : {
        name : cc.String,
        sections:[cc.String],
    }
})

cc.Class({
    extends: cc.Component,

    properties: {
        labelNode: {
            default: null,
            type: cc.Node
        },
        showCtrNode: {
            default: null,
            type: cc.Node
        },
        emptyString:cc.String,
        plots : {
            default : [],
            type : [Plot]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.showCtrS = this.showCtrNode.getComponent("2_showControl");
        this.nowString = "";
        this.heavenSonID = -2;
        tN = this.plots.length;
        this.plotI = Math.floor(Math.random()*tN);    // 可均衡获取 0 到 tN-1 的随机整数
        this.PlotSectionI = 0;

        //定时更新 每5秒刷新一次
        this.schedule(function() {
            this.changeText();
        }, 5);
    },

    changeText() {
        //当前槽位是否为空
        isEmpty = this.showCtrS.currentSlot.isEmpty;
        if(isEmpty){//空则显示一串固定文本
            this.nowString = this.emptyString;
            this.labelNode.getComponent(cc.Label).string =this.nowString;
        }else{//非空，则显示剧情
            this.heavenSon = this.showCtrS.currentSlot.heavenSon;
            if(this.heavenSonID!=this.heavenSon.heavenSonId){
                this.PlotSectionI = 0;//换人了清空
                this.nowString = "";
            }
            this.heavenSonID = this.heavenSon.heavenSonId;
            slotSonName = this.heavenSon.name;

            this.nowString+= this.getNewSection(this.plotI,this.PlotSectionI,slotSonName);
            this.labelNode.getComponent(cc.Label).string =this.nowString;

            //如果当前是最后一句，则在更新后，将文本清空，换下一章节。
            if(this.PlotSectionI==this.plots[this.plotI].sections.length-1){
                this.nowString = "";
                this.plotI = (this.plotI+1)%(this.plots.length);
                this.PlotSectionI = 0;
            }else{//不是最后一句，下一段
                this.nowString+="\n\n";//空一行
                this.PlotSectionI++;
            }
        }
        
        //
    },

    // 获得替换后的一段文字
    getNewSection(plotI,sectionI,name){
        sectionS = this.plots[plotI].sections[sectionI];
        newSectionS = sectionS.replace(/xx/g,name);//xx为替换的字符标记
        return newSectionS;
    }

});
