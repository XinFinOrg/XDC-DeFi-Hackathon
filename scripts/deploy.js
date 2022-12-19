const { ethers } = require('hardhat');
const { writeFileSync } = require('fs');

async function deploy(name, ...params) {
  const Contract = await ethers.getContractFactory(name);
  return await Contract.deploy(...params).then(f => f.deployed());
}

async function main() {
  const safeDecMath = await deploy('SafeDecimalMath');
  console.log("SafeDecimalMath deployed", safeDecMath.address)
  const addr = await deploy('AddressResolver');
  console.log("AddressResolver deployed", addr.address)
  console.log("EXCHANGERATE deployed 0x3cEF8f7481D3BdaBB16B662d131110Ad0Dc7Bb0e");
  // const exchange = await deploy('ExchangeRate', "0x33f4212b027e22af7e6ba21fc572843c0d701cd1", "0x97A6d407f4CD30936679d0a28A3bc2A7F13a2185", "839e3a5a88eb4c59aafb1fcedcdc0dd7");
  // console.log("ExchangeRate deployed", exchange.address);

  // const xSynContract = await ethers.getContractFactory("XSynProtocol", {
  //   libraries: {
  //     SafeDecimalMath: safeDecMath.address,
  //   },
  // });
  // const xSyn = await xSynContract.deploy(200).then(f => f.deployed());;
  // console.log("XSyn Protocol deployed", xSyn.address);

  const XSynProtocol = await deploy('XSynProtocol', 200);
  console.log("XSynProtocol deployed", XSynProtocol.address);

  const xdusd = await deploy('XDUSDCore', "XDUSD Contract", "XDUSD", XSynProtocol.address);
  console.log("XDUSD deployed", xdusd.address)


  // const XSynExchange = await ethers.getContractFactory("XSynExchange", {
  //   libraries: {
  //     SafeDecimalMath: safeDecMath.address,
  //   },
  // });
  // const xsynexchange = await XSynExchange.deploy().then(f => f.deployed());;
  // console.log("XSynExchange deployed", xsynexchange.address);

  const xsynexchange = await deploy('XSynExchange');
  console.log("XSynExchange deployed", xsynexchange.address);

  const xdbtc = await deploy('SyntheticAssets', "XDBTC Contract", "XDBTC", xsynexchange.address);
  console.log("XDBTC deployed", xdbtc.address)

  const xdeth = await deploy('SyntheticAssets', "XDETH Contract", "XDETH", xsynexchange.address);
  console.log("XDETH deployed", xdeth.address)

  const xdpax = await deploy('SyntheticAssets', "XDPAX Contract", "XDPAX", xsynexchange.address);
  console.log("XDPAX deployed", xdpax.address)

  const xdsol = await deploy('SyntheticAssets', "XDSOL Contract", "XDSOL", xsynexchange.address);
  console.log("XDSOL deployed", xdsol.address)

  const xdxau = await deploy('SyntheticAssets', "XDXAU Contract", "XDXAU", xsynexchange.address);
  console.log("XDXAU deployed", xdxau.address)

  const xdmatic = await deploy('SyntheticAssets', "XDMATIC Contract", "XDMATIC", xsynexchange.address);
  console.log("XDMATIC deployed", xdmatic.address)

  const xdaave = await deploy('SyntheticAssets', "XDAAVE Contract", "XDAAVE", xsynexchange.address);
  console.log("XDAAVE deployed", xdaave.address)

  const xdcgo = await deploy('SyntheticAssets', "XDCGO Contract", "XDCGO", xsynexchange.address);
  console.log("XDCGO deployed", xdcgo.address)

  const xdprnt = await deploy('SyntheticAssets', "XDPRNT Contract", "XDPRNT", xsynexchange.address);
  console.log("XDPRNT deployed", xdprnt.address)

  const xdxsp = await deploy('SyntheticAssets', "XDXSP Contract", "XDXSP", xsynexchange.address);
  console.log("XDXSP deployed", xdxsp.address)

  const xdsrx = await deploy('SyntheticAssets', "XDSRX Contract", "XDSRX", xsynexchange.address);
  console.log("XDSRX deployed", xdsrx.address)

  writeFileSync('output.json', JSON.stringify({
    XSynProtocol: XSynProtocol.address,
    ADDRESSRESOLVER: addr.address,
    EXCHANGERATE: "0x3cEF8f7481D3BdaBB16B662d131110Ad0Dc7Bb0e",
    XDUSD: xdusd.address,
    XSynExchange: xsynexchange.address,
    XDBTC: xdbtc.address,
    XDETH: xdeth.address,
    XDPAX: xdpax.address,
    XDSOL: xdsol.address,
    XDXAU: xdxau.address,
    XDMATIC: xdmatic.address,
    XDAAVE: xdaave.address,
    XDCGO: xdcgo.address,
    XDPRNT: xdprnt.address,
    XDXSP: xdxsp.address,
    XDSRX: xdsrx.address,
    SafeDecimalMath: safeDecMath.address,
    pliaddress: "0xb3db178db835b4dfcb4149b2161644058393267d"
  }, null, 2));
}
if (require.main === module) {
  main().then(() => process.exit(0))
    .catch(error => { console.error(error); process.exit(1); });
}