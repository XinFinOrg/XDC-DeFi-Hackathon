(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function MethodCall(){
        this.width = 500;
        this.height = 50;
        this.addProperty("cvalue", "");
        this.addProperty("evalue", "");
        this.addProperty("avalue", "");
        this.eventsData = {}
        this.eventsStateMutability = {}
        this.eventsDataIn = {}
        this.lastEVal = null;
        this.combo = null;
        this.uploadBtn = null;
        this.amountWidget = null;
        this.widget = this.addWidget("text","Contract Address","","cvalue");  //link to property value
        this.resetSize()
    }

    MethodCall.prototype.reset = function(total_reset=false){
        this.removeUploadABIBtn()
        this.removeAmountWidget()
        if(total_reset){
            this.removeEventSelect()
        }

        this.removeTrigger()
        this.removeAction()
        
        if(this.lastEVal){
            for(let x of this.eventsData[this.lastEVal]){

                let type_ = 'number'
                if(datamap.hasOwnProperty(x.type)){
                    type_ = datamap[x.type]
                }

                let name_ = x.name;
                if(!name_){
                    name_ = type_;
                }

                let slot = this.findOutputSlot(name_)
                if(slot!=-1){
                    this.removeOutput(slot)
                }
            }
        }
        
        if(this.lastEVal){
            for(let x of this.eventsDataIn[this.lastEVal]){
                
                let type_ = 'number'
                if(datamap.hasOwnProperty(x.type)){
                    type_ = datamap[x.type]
                }

                let name_ = x.name;
                if(!name_){
                    name_ = type_;
                }

                let slot = this.findInputSlot(name_)
                if(slot!=-1){
                    this.removeInput(slot)
                }
            }
            this.lastEVal = null;
        }
        
        if(total_reset){
            this.eventsData = {}
            this.eventsDataIn = {}
            this.eventsStateMutability = {}
        }
    }

    MethodCall.prototype.removeTrigger = function(){
        let slot = this.findOutputSlot("onFinish")
        if(slot!=-1){
            this.removeOutput(slot)
        }
    }

    MethodCall.prototype.removeAction = function(){
        let slot = this.findInputSlot("Call")
        if(slot!=-1){
            this.removeInput(slot)
        }
    }

    MethodCall.prototype.onPropertyChanged =function(name, value){
        if(name=="cvalue" && value==""){
            this.reset(true)
            this.height = 35;
            this.resetSize()
            return;
        }else if(name=="evalue" && !this.eventsData.hasOwnProperty(value)){
            return;
        }
        if(name=="cvalue"){
            this.parseContract(value)
        }else if(name=="evalue"){
            this.manageOutput(value, this.lastEVal);
            this.lastEVal = value;
        }
    }

    MethodCall.prototype.manageOutput = function(eventName, lastEvent){
        this.reset()
        this.height = 110;
        let j =0;
        let k =0;
        if(this.eventsStateMutability[eventName]=="payable" && !this.amountWidget){
            this.height += 20;
            this.amountWidget = this.addWidget("text","Amount","","avalue");
            this.resetSize()
        }
        this.addInput("Call", LiteGraph.ACTION);
        for(let x of this.eventsDataIn[eventName]){
            let type_ = 'number'
            if(datamap.hasOwnProperty(x.type)){
                type_ = datamap[x.type]
            }
            let name_ = x.name;
            if(!name_){
                name_ = type_;
            }
            
            this.addInput(name_, type_);
            k +=15;
        }

        this.addOutput("onFinish", LiteGraph.EVENT);
        for(let x of this.eventsData[eventName]){
            let type_ = 'number'
            if(datamap.hasOwnProperty(x.type)){
                type_ = datamap[x.type]
            }
            let name_ = x.name;
            if(!name_){
                name_= type_;
            }
            this.addOutput(name_, type_);
            j +=15;
        }
        if(j>k){
            this.height += j;
        }else{
            this.height +=k;
        }
        this.resetSize()   
    }

    MethodCall.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    MethodCall.prototype.removeUploadABIBtn =  function(){
        if(this.uploadBtn){
            for(let i=0;i<this.widgets.length;i++){
                if(this.widgets[i].name=="Upload ABI"){
                    this.widgets.pop(i);
                    this.uploadBtn = null;
                    break;
                }
            }
        }
    }

    MethodCall.prototype.removeAmountWidget =  function(){
        if(this.amountWidget){
            for(let i=0;i<this.widgets.length;i++){
                if(this.widgets[i].name=="Amount"){
                    this.widgets.pop(i);
                    this.amountWidget = null;
                    break;
                }
            }
        }
    }

    MethodCall.prototype.removeEventSelect =  function(){
        if(this.combo){
            for(let i=0;i<this.widgets.length;i++){
                if(this.widgets[i].name=="Function Name"){
                    this.widgets.pop(i);
                    this.combo = null;
                    break;
                }
            }
        }
    }

    MethodCall.prototype.handleAbi = function(abi){
        this.removeUploadABIBtn()
        this.removeAmountWidget()
        for(let o of abi.abi){
            if(o.type=='function' && o.stateMutability!='view'){
                let name = o.name;
                this.eventsData[name] = o.outputs   
                this.eventsDataIn[name] = o.inputs
                this.eventsStateMutability[name] = o.stateMutability
            }
        }
        let values = []
        for(let x in this.eventsData){
            values.push(x)
        }
        let context = this;
        let iniVal = values[0];
        
        if(!this.combo){
            this.combo = this.addWidget("combo","Function Name", iniVal, function(v){
                context.setProperty("evalue", v)
            }, { values });
        }else{
            this.combo.options.values = values;
        }

        this.manageOutput(values[0], this.lastEVal)
        this.lastEVal = values[0]
        context.setProperty("evalue", values[0])

        this.resetSize()
        $("#loader").css('display','none');
    }

    MethodCall.prototype.parseContract = async function(contract_address){
        $("#loader").css('display','block');
        try{
         let abi = await (await fetch(`http://127.0.0.1:4040/contract?contractadd=${contract_address}`)).json()
         if(!abi.status){
            console.log("ABI not found!")
            SnackBar({
                message: "ABI not found!",
                status: "error",
                position: "tr",
                timeout: 3000
            });
            this.reset(true)
            this.uploadBtn = this.addWidget("button","Upload ABI","",()=>{
                let uploadInput = document.createElement("input")
                uploadInput.type = "file"
                uploadInput.accept = ".json"
                uploadInput.style.display = "none"
                document.body.appendChild(uploadInput)
                uploadInput.onchange = ()=>{
                    let reader = new FileReader();
                    // Closure to capture the file information.
                    reader.onload = (e) => {
                        this.handleAbi({ abi: JSON.parse(JSON.parse(e.target.result).abi) })
                        document.body.removeChild(uploadInput)
                    };  
                    // Read in the image file as a data URL.
                    reader.readAsText(uploadInput.files[0]);
                }
                uploadInput.click()
            });
            this.height = 60;
            this.resetSize()
            $("#loader").css('display','none');
            return;
         }else{
            this.handleAbi(abi)
         }
        }catch(e){
            SnackBar({
                message: "Something went wrong try again!",
                status: "error",
                position: "tr",
                timeout: 3000
            });
            console.error(e)
            $("#loader").css('display','none');
            return;
        }
    }

    MethodCall.title = "Contract Call Transaction";
    MethodCall.desc = "Call the contract's stateful function";

    LiteGraph.registerNodeType("contract/Contract Call Transaction", MethodCall);

})(this)