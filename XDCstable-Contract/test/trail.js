const Stable = artifacts.require("Stable");


contract("Stable", (accounts) => {
    it("should take a loan", async () => {
      
        const stableinstance = await Stable.deployed();
        const balance = await stableinstance.balanceOf.call(accounts[0]);
        console.log(balance+ "before")
        let amount = web3.utils.toWei('1', "ether")
        
        const takeloan = await stableinstance.getloan(amount.toString() ,30);
        const disburseloan = await stableinstance.disburseloan(0,{value:web3.utils.toWei('1.05', "ether")})
        const data = await stableinstance.readloan(0);
        let abc = await stableinstance.balanceOf.call(accounts[0])
        console.log(abc + "after")
     

        assert.equal(balance.valueOf(), 1000, "10000 wasn't in the first account");
    });

    it("should show price", async () => {
      
        const stableinstance = await Stable.deployed();
        const update = await stableinstance.getPriceInfo();
        const balance = await stableinstance.show();
        console.log(balance+ "before")
        
    });


});
