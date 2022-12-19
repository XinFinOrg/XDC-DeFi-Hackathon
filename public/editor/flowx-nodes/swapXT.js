(function(global) {
    var LiteGraph = global.LiteGraph;

    function SwapXT(){
        this.width = 500;
        this.height = 95;
        this.addInput("Call", LiteGraph.ACTION);
        this.addInput("to (address)", "string");
        this.addInput("Amount", "number");
        this.addOutput("True", LiteGraph.EVENT);
        this.addOutput("False", LiteGraph.EVENT);
        this.resetSize()
    }

    SwapXT.prototype.onPropertyChanged =function(name, value){
    }


    SwapXT.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    SwapXT.title = "Swap xdc to token";
    SwapXT.desc = "Swap between xdc and tokens";

    LiteGraph.registerNodeType("swap/XDC To Token", SwapXT);

})(this)