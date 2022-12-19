(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function TokenPrice(){
        this.width = 500;
        this.height = 50;
        this.addInput("Call", LiteGraph.ACTION);
        this.addInput("token (address)", "number");
        this.addOutput("onResult", LiteGraph.EVENT);
        this.addOutput("Price", "number");
        this.resetSize()
    }

    TokenPrice.prototype.onPropertyChanged =function(name, value){
    }


    TokenPrice.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    TokenPrice.title = "Token price in usd";
    TokenPrice.desc = "Get the token price in usd";

    LiteGraph.registerNodeType("price/Token price(In usd)", TokenPrice);

})(this)