const Migrations = artifacts.require("Migrations");
const Stable = artifacts.require("Stable");

module.exports = function (deployer) {
  deployer.deploy(Stable);
  
};
