(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function SwapTX(){
        this.width = 500;
        this.height = 95;
        this.addInput("Call", LiteGraph.ACTION);
        this.addInput("from (address)", "string");
        this.addInput("Amount", "number");
        this.addOutput("True", LiteGraph.EVENT);
        this.addOutput("False", LiteGraph.EVENT);
        this.resetSize()
    }

    SwapTX.prototype.onPropertyChanged =function(name, value){
    }


    SwapTX.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    SwapTX.title = "Swap token to xdc";
    SwapTX.desc = "Swap between token and xdc";

    LiteGraph.registerNodeType("swap/Token To XDC", SwapTX);

})(this)