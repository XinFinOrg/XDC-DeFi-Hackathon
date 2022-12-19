(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function TelegramSend(){
        this.width = 500;
        this.height = 95;
        this.addInput("Notify", LiteGraph.ACTION);
        this.addInput("Phone number", "string");
        this.addInput("Message", "string");
        this.resetSize()
    }

    TelegramSend.prototype.onPropertyChanged =function(name, value){
    }


    TelegramSend.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    TelegramSend.title = "Send message to telegram";
    TelegramSend.desc = "Notify your self by telegram";

    LiteGraph.registerNodeType("notifications/Telegram send", TelegramSend);

})(this)