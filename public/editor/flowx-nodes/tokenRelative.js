(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function TokenRelative(){
        this.width = 500;
        this.height = 70;
        this.addInput("Call", LiteGraph.ACTION);
        this.addInput("from token (address)", "number");
        this.addInput("to token (address)", "number");
        this.addOutput("onResult", LiteGraph.EVENT);
        this.addOutput("Price", "number");
        this.resetSize()
    }

    TokenRelative.prototype.onPropertyChanged =function(name, value){
    }


    TokenRelative.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    TokenRelative.title = "Token price in other token";
    TokenRelative.desc = "Get the token price in given token address";

    LiteGraph.registerNodeType("price/Token price relative", TokenRelative);

})(this)