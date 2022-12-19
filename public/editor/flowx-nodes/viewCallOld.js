(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function ViewCall(){
        this.width = 500;
        this.height = 50;

        this.addProperty("cvalue", "");
        this.addProperty("evalue", "");
        this.setProperty("color", "blue");
        this.addInput("Call", "boolean,number,string");
        this.eventsData = {}
        this.eventsDataIn = {}
        this.lastEVal = null;
        this.widget = this.addWidget("text","Contract Address","","cvalue");  //link to property value
        //this.widgets_up = true;
        this.resetSize()
    }

    ViewCall.prototype.onPropertyChanged =function(name, value){
        if(name=="cvalue" && value==""){
            return;
        }else if(name=="evalue" && !this.eventsData.hasOwnProperty(value)){
            return;
        }
        if(name=="cvalue"){
            this.parseContract(value)
        }else if(name=="evalue"){
            if(!this.lastEVal){
                this.manageOutput(value, null);
                this.lastEVal = value;
                return;
            }
            this.manageOutput(value, this.lastEVal);
            this.lastEVal = value;
        }
    }

    ViewCall.prototype.manageOutput = function(eventName, lastEvent){
        if(lastEvent){
           for(let x of this.eventsData[lastEvent]){
            this.removeOutput(x.name)
           }
           for(let x of this.eventsDataIn[lastEvent]){
            this.removeInput(x.name)
           }
        }
        this.height = 100;
        let j =0;
        let k =0;
        for(let x of this.eventsData[eventName]){
            let type_ = 'number'
            if(datamap.hasOwnProperty(x.type)){
                type_ = datamap[x.type]
            }
            if(!x.name){
                x.name=x.type;
            }
            this.addOutput(x.name, type_);
            j +=10;
        }
        for(let x of this.eventsDataIn[eventName]){
            let type_ = 'number'
            if(datamap.hasOwnProperty(x.type)){
                type_ = datamap[x.type]
            }
            if(!x.name){
                x.name=x.type;
            }
            this.addInput(x.name, type_);
            k +=10;
        }
        if(j>k){
            this.height += j;
        }else{
            this.height +=k;
        }
        this.resetSize()   
    }

    ViewCall.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    ViewCall.prototype.parseContract = async function(contract_address){
        $("#loader").css('display','block');
        let abi;
        try{
            abi = await (await fetch(`https://theflowx-poa9ef7c10fe22e3c25239de2aa8814b378393b3a3-titan.stackos.io/contract?contractadd=${contract_address}`)).json()
        }catch(e){
            $("#loader").css('display','none');
            return;
        }

        for(let o of abi.abi){
            if(o.type=='function' && o.stateMutability=='view'){
                let name = o.name;
                this.eventsData[name] = o.outputs   
                this.eventsDataIn[name] = o.inputs   
            }
        }

        let values = []
        for(let x in this.eventsData){
            values.push(x)
        }
        let context = this;
        let iniVal = values[0];
        if(context.getInputOrProperty("evalue")){
            iniVal = context.getInputOrProperty("evalue")
        }
        this.combo = this.addWidget("combo","Function Name", iniVal, function(v){
            context.setProperty("evalue", v)
        }, { values });

        if(context.getInputOrProperty("evalue")){
            this.manageOutput(context.getInputOrProperty("evalue"), null)
            this.lastEVal = context.getInputOrProperty("evalue")
        }else{
            this.manageOutput(values[0], null)
            this.lastEVal = values[0]
            context.setProperty("evalue", values[0])
        }
        this.resetSize()
        $("#loader").css('display','none');
    }

    ViewCall.title = "Call View Function";
    ViewCall.desc = "Call the view function";

    LiteGraph.registerNodeType("contract/View Function", ViewCall);

})(this)