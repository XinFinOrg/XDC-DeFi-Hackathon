(function(global) {
    var LiteGraph = global.LiteGraph;

    let datamap  = {
        uint256:"number",
        address:"string",
        bool:"bool",
        string:"string"
    } 

    function EventListner(){
        this.width = 500;
        this.height = 50;

        this.addProperty("cvalue", "");
        this.addProperty("evalue", "");
        this.eventsData = {}
        this.lastEVal = null;
        this.combo = null;
        this.uploadBtn = null;
        this.widget = this.addWidget("text","Contract Address","","cvalue");  //link to property value
        this.resetSize()
    }

    EventListner.prototype.reset = function(total_reset=false){
        this.removeUploadABIBtn()
        if(total_reset){
            this.removeEventSelect()
        }
        this.removeTrigger()
        if(this.lastEVal){
            for(let x of this.eventsData[this.lastEVal]){
             let slot = this.findOutputSlot(x.name)
             if(slot!=-1){
                 this.removeOutput(slot)
             }
            }
            this.lastEVal = null;
        }
        if(total_reset){
            this.eventsData = {}
        }
    }

    EventListner.prototype.removeTrigger = function(){
        let slot = this.findOutputSlot("onEvent")
        if(slot!=-1){
            this.removeOutput(slot)
        }
    }

    EventListner.prototype.onPropertyChanged =function(name, value){
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
            this.manageOutput(value);
            this.lastEVal = value;
        }
    }

    EventListner.prototype.manageOutput = function(eventName){
        this.reset()
        this.height = 110;
        this.addOutput("onEvent", LiteGraph.EVENT);
        for(let x of this.eventsData[eventName]){
            let type_ = 'number'
            if(datamap.hasOwnProperty(x.type)){
                type_ = datamap[x.type]
            }
            this.addOutput(x.name, type_);
            this.height +=10;
        }
        this.resetSize()   
    }

    EventListner.prototype.resetSize = function(){
        this.size = [this.width, this.height];
    }

    EventListner.prototype.removeUploadABIBtn =  function(){
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

    EventListner.prototype.removeEventSelect =  function(){
        if(this.combo){
            for(let i=0;i<this.widgets.length;i++){
                if(this.widgets[i].name=="Event Name"){
                    this.widgets.pop(i);
                    this.combo = null;
                    break;
                }
            }
        }
    }

    EventListner.prototype.handleAbi = function(abi){
        this.removeUploadABIBtn()
        for(let o of abi.abi){
            if(o.type=='event'){
                let name = o.name;
                this.eventsData[name] = o.inputs   
            }
        }
        let values = []
        for(let x in this.eventsData){
            values.push(x)
        }
        let context = this;
        let iniVal = values[0];
        
        if(!this.combo){
            this.combo = this.addWidget("combo","Event Name", iniVal, function(v){
                context.setProperty("evalue", v)
            }, { values });
        }else{
            this.combo.options.values = values;
        }

        this.manageOutput(values[0])
        this.lastEVal = values[0]
        context.setProperty("evalue", values[0])

        this.resetSize()
        $("#loader").css('display','none');
    }

    EventListner.prototype.parseContract = async function(contract_address){
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

    EventListner.title = "Event Listner";
    EventListner.desc = "Listen on particular event";

    LiteGraph.registerNodeType("events/listen", EventListner);

})(this)