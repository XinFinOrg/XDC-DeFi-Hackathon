(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function UniswapQuery(){
        this.width = 500;
        this.height = 50;

        this.eventsData = {}
        this.lastEVal = null;
        this.addInput("Execute", LiteGraph.ACTION);
        this.addInput("Pool (address)", "string");
        this.addOutput("onResult", LiteGraph.EVENT)
        this.addOutput("Locked Amount", "number")
        
        //this.widget = this.addWidget("text","Contract Address","","cvalue");  //link to property value
        //this.widgets_up = true;
        this.resetSize()
    }

    UniswapQuery.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }


    UniswapQuery.title = "Liqudity Query";
    UniswapQuery.desc = "Query Liqudity On Uniswap using theGraph";

    LiteGraph.registerNodeType("theGraph/Uniswap Liqudity", UniswapQuery);

})(this)