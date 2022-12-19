(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function SwapTT(){
        this.width = 500;
        this.height = 95;
        this.addInput("Call", LiteGraph.ACTION);
        this.addInput("from (address)", "string");
        this.addInput("to (address)", "string");
        this.addInput("Amount", "number");
        this.addOutput("True", LiteGraph.EVENT);
        this.addOutput("False", LiteGraph.EVENT);
        this.resetSize()
    }

    SwapTT.prototype.onPropertyChanged =function(name, value){
    }


    SwapTT.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    SwapTT.title = "Swap token to token";
    SwapTT.desc = "Swap between tokens";

    LiteGraph.registerNodeType("swap/Token To Token", SwapTT);

})(this)