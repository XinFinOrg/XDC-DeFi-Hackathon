(function(global) {
    var LiteGraph = global.LiteGraph;

    function CronTask(){
        this.width = 500;
        this.height = 50;

        this.addProperty("cvalue", "");
        this.widget = this.addWidget("text","Expression","","cvalue");  //link to property value
        this.addOutput("onTask", LiteGraph.EVENT);
        this.resetSize()
    }

    CronTask.prototype.removeTrigger = function(){
        let slot = this.findOutputSlot("onEvent")
        if(slot!=-1){
            this.removeOutput(slot)
        }
    }

    CronTask.prototype.onPropertyChanged =function(name, value){

    }


    CronTask.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    CronTask.title = "Cron Task";
    CronTask.desc = "Execute flow at particular interval";

    LiteGraph.registerNodeType("events/Cron Task", CronTask);

})(this)