(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function XdcPrice(){
        this.width = 500;
        this.height = 50;
        this.addInput("Call", LiteGraph.ACTION);
        this.addOutput("onResult", LiteGraph.EVENT);
        this.addOutput("Price", "number");
        this.resetSize()
    }

    XdcPrice.prototype.onPropertyChanged =function(name, value){
    }


    XdcPrice.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    XdcPrice.title = "XDC price in usd";
    XdcPrice.desc = "Get the xdc price in usd";

    LiteGraph.registerNodeType("price/XDC price(In usd)", XdcPrice);

})(this)