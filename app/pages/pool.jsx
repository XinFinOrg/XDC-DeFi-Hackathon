import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Fragment, useState, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import styles from "../styles/Home.module.css";
import { tokens } from "../utils/tokens";
import { tokenpairs } from "../utils/pair";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { Contract, ethers } from "ethers";
import {
  SWAP_ROUTER_ADDRESS,
  SWAP_ROUTER_ABI,
  Token_ABI,
  WXDC_ADDRESS,
  TOKEN_ONE_ADDRESS,
  SWAP_FACTORY_ABI,
  SWAP_FACTORY_ADDRESS,
} from "../constants/Index";

const token1 = tokens;
const token2 = tokens;

export default function Pool() {
  const [toggleRemove, setToggleRemove] = useState(false);
  const [expand, setExpand] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedToken1, setSelectedToken1] = useState(token1[0]);
  const [selectedToken2, setSelectedToken2] = useState(token2[0]);

  const newPool = () => {
    setToggle(!toggle);
  };

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([...tokens]);
  const [desiredAmountA, setDesiredAmountA] = useState(0);
  const [desiredAmountB, setDesiredAmountB] = useState(0);

  const [liquidity, setLiquidity] = useState();
  const [positions, setPositions] = useState();

  const [reserveA, setReserveA] = useState(0);
  const [reserveB, setReserveB] = useState(0);

  // Creating some global variables to use in the upcoming liquidity functions
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const contract = useContract({
    address: SWAP_ROUTER_ADDRESS,
    abi: SWAP_ROUTER_ABI,
    signerOrProvider: signer || provider,
  });

  const Factory_contract = useContract({
    address: SWAP_FACTORY_ADDRESS,
    abi: SWAP_FACTORY_ABI,
    signerOrProvider: signer || provider,
  });

  // const addressTokenA = TOKEN_ONE_ADDRESS;
  // const addressTokenB = TOKEN_TWO_ADDRESS;

  // function handleChange(event) {
  //   setDesiredAmountA(parseInt(event.target.value));
  //   setDesiredAmountB(parseInt(event.target.value));
  // }

  const getDeadline = () => {
    const _deadline = Math.floor(Date.now() / 1000) + 900;
    console.log(_deadline);
    return _deadline;
  };

  const handleAddliquidity = () => {
    if (selectedToken1 && selectedToken2 && selectedToken1 != selectedToken2) {
      if (selectedToken1.symbol != "XDC" && selectedToken2.symbol != "XDC") {
        addLiquidityContract(
          desiredAmountA,
          desiredAmountB,
          selectedToken1.address,
          selectedToken2.address
        );
      } else if (selectedToken1.symbol == "XDC") {
        addLiquidityEthContract(
          selectedToken2.address,
          desiredAmountB,
          desiredAmountA
        );
      } else if (selectedToken2.symbol == "XDC") {
        addLiquidityEthContract(
          selectedToken1.address,
          desiredAmountA,
          desiredAmountB
        );
      }
    }
  };

  const approveTokens = async (tokenInAddress, amountIn) => {
    try {
      const Token_contract = new Contract(tokenInAddress, Token_ABI, signer);

      const tx = await Token_contract.approve(
        SWAP_ROUTER_ADDRESS,
        ethers.utils.parseEther(amountIn.toString())
      );

      await tx.wait();
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const addLiquidityContract = async (
    valueOne,
    valueTwo,
    addressTokenA,
    addressTokenB
  ) => {
    try {
      if (addressTokenA && addressTokenB && valueOne && valueTwo && address) {
        await approveTokens(addressTokenA, valueOne);
        await approveTokens(addressTokenB, valueTwo);
        const _deadline = getDeadline();
        const _addLiquidity = await contract.addLiquidity(
          addressTokenA,
          addressTokenB,
          ethers.utils.parseEther(valueOne.toString()),
          ethers.utils.parseEther(valueTwo.toString()),
          1,
          1,
          address,
          _deadline // current time + 10 mins
        );
        setLoading(true);
        await _addLiquidity.wait();
        setLoading(false);
      } else {
        alert("INPUT DUMBASS!!!");
      }
    } catch (err) {
      // alert shall be changed to toast.error(err.reason) once kushagra adds it
      alert(err.reason);
      console.error(err);
    }
  };

  // ask dhruv about the parameters here
  const addLiquidityEthContract = async (
    addressToken,
    tokenValue,
    ETHValue
  ) => {
    try {
      // await approveTokens(
      //   addressToken,
      //   ethers.utils.parseEther(tokenValue.toString())
      // );
      const _amount = ethers.utils.parseEther(ETHValue.toString());
      const _deadline = getDeadline();
      const _addLiquidity = await contract.addLiquidityETH(
        addressToken,
        ethers.utils.parseEther(tokenValue.toString()),
        1,
        1,
        address,
        _deadline,
        {
          value: _amount,
        }
      );
      await _addLiquidity.wait();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const getPositions = async (id) => {
    try {
      const promises = [];

      for (let i = 0; i < 3; i++) {
        const balance = getLiquidity(
          tokenpairs[i].token1,
          tokenpairs[i].token2
        );
        promises.push({ ...tokenpairs[i], balance });
      }

      const _positions = await Promise.all(promises);
      console.log(_positions);
      setPositions(_positions);
    } catch (err) {
      console.log(err);
    }
  };

  const getLiquidity = async (addressTokenA, addressTokenB) => {
    const _liquidity = await contract.getLiquidityAmount(
      address,
      addressTokenA,
      addressTokenB
    );
    const liqAmount = ethers.utils.formatEther(_liquidity.toString());
    console.log(liqAmount);
    return liqAmount;
  };

  const handleRemoveLiquidity = async (
    token1Address,
    token2Address,
    pairAddress
  ) => {
    if (
      token1Address &&
      token2Address &&
      token1Address != token2Address &&
      liquidity
    ) {
      if (token1Address != WXDC_ADDRESS && token2Address != WXDC_ADDRESS) {
        removeLiquidityContract(
          token1Address,
          token2Address,
          pairAddress,
          liquidity
        );
      } else if (
        token1Address == WXDC_ADDRESS &&
        token2Address != WXDC_ADDRESS
      ) {
        removeLiquidityEthContract(token2Address, pairAddress, liquidity);
      } else if (
        token1Address != WXDC_ADDRESS &&
        token2Address == WXDC_ADDRESS
      ) {
        removeLiquidityEthContract(token1Address, pairAddress, liquidity);
      }
    }
  };

  // might need to take an input here
  const removeLiquidityContract = async (
    addressTokenA,
    addressTokenB,
    pairAddress,
    liquidityAmount
  ) => {
    try {
      if (addressTokenA && addressTokenA && liquidityAmount) {
        // await approveTokens(
        //   pairAddress,
        //   ethers.utils.parseEther(liquidityAmount.toString())
        // );
        const _deadline = getDeadline();
        const _removeLiquidity = await contract.removeLiquidity(
          addressTokenA,
          addressTokenB,
          ethers.utils.parseEther(liquidityAmount.toString()),
          1,
          1,
          address,
          _deadline
        );
        setLoading(true);
        await _removeLiquidity.wait();
        setLoading(false);
        // toast.success("Liquidity removed");
      }
    } catch (err) {
      alert(err.reason);
      console.error(err);
    }
  };

  // ask dhruv about parameters
  const removeLiquidityEthContract = async (
    addressTokenA,
    pairAddress,
    liquidityAmount
  ) => {
    try {
      if (liquidityAmount) {
        /// approve Lp token transfer
        await approveTokens(
          pairAddress,
          ethers.utils.parseEther(liquidityAmount.toString())
        );
        const _removeLiquidity = await contract.removeLiquidityETH(
          addressTokenA,
          ethers.utils.parseEther(liquidityAmount.toString()),
          val,
          0,
          address,
          _deadline
        );
        setLoading(true);
        await _removeLiquidity.wait();
        setLoading(false);
        // toast.success()
      }
    } catch (err) {
      alert(err.reason);
      console.error(err);
    }
  };

  /// As Soon as user selects both the tokens , call getReserve
  const getReserves = async (tokenA, tokenB) => {
    const response = await contract.getReserve(tokenA, tokenB);
    setReserveA(ethers.utils.formatEther(response.reserveA));
    setReserveB(ethers.utils.formatEther(response.reserveB));
    console.log(
      ethers.utils.formatEther(response.reserveA),
      ethers.utils.formatEther(response.reserveB)
    );
    // setOutAmount(_getAmount);
  };

  // 3 params on this one
  const quoteB = async (amountA, reserveA, reserveB) => {
    try {
      if (amountA) {
        const _fetchQuote = await contract.quote(
          ethers.utils.parseEther(amountA.toString()),
          ethers.utils.parseEther(reserveA.toString()),
          ethers.utils.parseEther(reserveB.toString())
        );
        console.log(ethers.utils.formatEther(_fetchQuote));
        // setQuote(_fetchQuote);
        setDesiredAmountB(ethers.utils.formatEther(_fetchQuote));
      }
    } catch (err) {
      // toast.error(err.reason);
      console.error(err);
    }
  };

  const quoteA = async (amountB, reserveA, reserveB) => {
    try {
      if (amountB) {
        const _fetchQuote = await contract.quote(
          ethers.utils.parseEther(amountB.toString()),
          ethers.utils.parseEther(reserveB.toString()),
          ethers.utils.parseEther(reserveA.toString())
        );
        console.log(ethers.utils.formatEther(_fetchQuote));
        // setQuote(_fetchQuote);
        setDesiredAmountA(ethers.utils.formatEther(_fetchQuote));
      }
    } catch (err) {
      // toast.error(err.reason);
      console.error(err);
    }
  };

  /// fetched reserves when both tokens are set
  useEffect(() => {
    if (
      selectedToken1 != 0 &&
      selectedToken2 != 0 &&
      selectedToken1 != selectedToken2
    ) {
      getReserves(selectedToken1.address, selectedToken2.address);
    }
  }, [selectedToken1, selectedToken2]);

  useEffect(() => {
    if (!positions) {
      getPositions();
    }

    console.log(positions);
  }, []);

  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover bg-[#03071E]
        ${
          !expand
            ? `${styles.bg1} bg-[url('../assets/landing.png')]`
            : `bg-[#03071E]`
        }
          `}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <>
          <div className=" w-full mt-10 flex flex-col justify-center items-center px-2">
            <div className="w-full flex justify-around">
              <h1 className=" text-gray-100 text-3xl font-semibold">Pools</h1>
              <button
                onClick={newPool}
                className="active:scale-95 bg-[#fc6f38] px-3 py-2 text-sm font-semibold rounded-md"
              >
                + New Pool
              </button>
            </div>
            <span className="mt-5 lg:w-7/12 bg-orange-500 opacity-90 px-6 py-4 text-md font-normal rounded-md">
              XDC-Fi allows users to create pool as well as adding and removing
              liquidity with three different tokens by depositing amount.
            </span>
            <div
              className={`${
                toggle ? `visible` : `hidden`
              } mt-8 lg:w-7/12 border rounded-lg border-gray-500 px-4 py-6 bg-transparent backdrop-blur-xl`}
            >
              <span className=" text-gray-100 text-lg font-semibold">
                Select Pair
              </span>
              <div className="lg:w-5/12 flex items-center justify-start ">
                {/* token1 */}
                <div className="">
                  <Listbox value={selectedToken1} onChange={setSelectedToken1}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative  cursor-default rounded-md w-36 lg:w-36 px-4 py-2.5 bg-gray-800 text-white pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedToken1.symbol}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-200"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100 "
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full z-[100] overflow-auto rounded-md  bg-gray-900 backdrop-blur-xl py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {tokens.map((token, tokenId) => (
                            <Listbox.Option
                              key={tokenId}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-100"
                                }`
                              }
                              value={token}
                            >
                              {({ selectedToken1 }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selectedToken1
                                        ? "font-medium"
                                        : "font-normal"
                                    }`}
                                  >
                                    {token.symbol}
                                  </span>
                                  {selectedToken1 ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5 text-gray-900"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

                {/* token2 */}
                <div className="ml-4 lg:ml-7">
                  <Listbox value={selectedToken2} onChange={setSelectedToken2}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative cursor-default rounded-md w-36 lg:w-36 px-4 py-2.5 bg-gray-800 text-white pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedToken2.symbol}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-200"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full z-[100] overflow-auto rounded-md  bg-gray-900 backdrop-blur-xl py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {tokens.map((token, tokenId) => (
                            <Listbox.Option
                              key={tokenId}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-100"
                                }`
                              }
                              value={token}
                            >
                              {({ selectedToken2 }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selectedToken2
                                        ? "font-medium"
                                        : "font-normal"
                                    }`}
                                  >
                                    {token.symbol}
                                  </span>
                                  {selectedToken2 ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5 text-gray-900"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
              {/* <div class="mt-4 relative pt-1 flex flex-col">
              <label for="customRange3" className=" text-white">
                0.05 % fee tier
              </label>
              <input
                type="range"
                className="mt-3 lg:w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer form-range p-0 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none"
                min="0"
                max="3"
                step="1"
                id="customRange3"
              />
            </div> */}
              <div className="mt-4 relative pt-1 flex flex-col">
                <span className=" text-gray-100 text-lg font-semibold">
                  Deposit Amounts
                </span>

                <input
                  type="number"
                  id=""
                  className="mt-3 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="token 1"
                  required
                  value={desiredAmountA}
                  onChange={(e) => {
                    setDesiredAmountA(e.target.value);
                    quoteB(e.target.value, reserveA, reserveB);
                  }}
                />

                <input
                  type="number"
                  id=""
                  className="mt-3 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="token 2"
                  required
                  value={desiredAmountB}
                  onChange={(e) => {
                    setDesiredAmountB(e.target.value);
                    quoteA(e.target.value, reserveA, reserveB);
                  }}
                />
              </div>
              <button
                type="button"
                className="text-white w-full mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr-2 mb-2"
                onClick={() => {
                  handleAddliquidity();
                }}
              >
                Add liquidity
              </button>
            </div>
          </div>
          <div className=" w-full flex justify-center items-start px-2 ">
            <div className="overflow-x-auto  relative w-full lg:w-7/12 rounded-md mx-auto lg:mx-auto font-fredoka text-white px- py-0 bg-[#03071e68] opacity-100 backdrop-blur-lg flex flex-col items-center justify-center mt-12 mb-32 ">
              <h2 className=" rounded-t-md text-xl font-semibold tracking-wid w-full bg-[blue-700] py-4 px-4 border-b border-gray-400">
                Your Active Liquidity Positions
              </h2>
              <div className=" lg:px-4 py-8 w-full  ">
                <table className=" w-full text-sm text-left text-gray-100 ">
                  <thead className=" text-sm uppercase  text-gray-100 border-b border-gray-500">
                    <tr>
                      <th scope="col" className="py-3 px-6">
                        Token A
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Token B
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Liq. Amount
                      </th>
                      <th scope="col" className="py-3 px-6">
                        Remove Liq.
                      </th>
                    </tr>
                  </thead>
                  {/* {positions ? (
                    positions.map((position) => {
                      <tbody>
                        <tr className=" border-b h-28 border-gray-500 text-gray-100">
                          <th
                            scope="row"
                            className="py-4 px-6 font-medium  whitespace-nowrap "
                          >
                            {position.token1}
                          </th>
                          <td className="py-4 px-6">{position.token2}</td>
                          <td className="py-4 px-6">{position.balance}</td>
                          <td className="py-4 px-6 ">
                            <input
                              type="number"
                              id=""
                              className={` ${
                                toggleRemove ? ` visible` : `hidden`
                              } bg-gray-800 text-white border mb-3  lg:w-44 border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                              placeholder="0"
                              required
                              onChange={(e) => setLiquidity(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (toggleRemove) {
                                  handleRemoveLiquidity(
                                    position.token1,
                                    position.token2,
                                    position.pair
                                  );
                                } else {
                                  setToggleRemove(!toggleRemove);
                                }
                              }}
                              className="text-white w-44  bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr- mb-2"
                            >
                              Remove Liquidity
                            </button>
                          </td>
                        </tr>
                      </tbody>;
                    })
                  ) : (
                    <a>Active liqudity Positions will appear here</a>
                  )} */}

                  <tbody>
                    <tr className=" border-b h-28 border-gray-500 text-gray-100">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium  whitespace-nowrap "
                      >
                        {tokenpairs[0].token1Name}
                      </th>
                      <td className="py-4 px-6">{tokenpairs[0].token2Name}</td>
                      <td className="py-4 px-6">
                        {tokenpairs[0].balance.slice(0, 7)}
                      </td>
                      <td className="py-4 px-6 ">
                        <input
                          type="number"
                          id=""
                          className={` ${
                            toggleRemove ? ` visible` : `hidden`
                          } bg-gray-800 text-white border mb-3  lg:w-44 border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                          placeholder="0"
                          required
                          onChange={(e) => setLiquidity(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (toggleRemove) {
                              handleRemoveLiquidity(
                                tokenpairs[0].token1,
                                tokenpairs[0].token2,
                                tokenpairs[0].pair
                              );
                            } else {
                              setToggleRemove(!toggleRemove);
                            }
                          }}
                          className="text-white w-44  bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr- mb-2"
                        >
                          Remove Liquidity
                        </button>
                      </td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr className=" border-b h-28 border-gray-500 text-gray-100">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium  whitespace-nowrap "
                      >
                        {tokenpairs[1].token1Name}
                      </th>
                      <td className="py-4 px-6">{tokenpairs[1].token2Name}</td>
                      <td className="py-4 px-6">
                        {tokenpairs[1].balance.slice(0, 7)}
                      </td>
                      <td className="py-4 px-6 ">
                        <input
                          type="number"
                          id=""
                          className={` ${
                            toggleRemove ? ` visible` : `hidden`
                          } bg-gray-800 text-white border mb-3  lg:w-44 border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                          placeholder="0"
                          required
                          onChange={(e) => setLiquidity(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (toggleRemove) {
                              handleRemoveLiquidity(
                                tokenpairs[1].token1,
                                tokenpairs[1].token2,
                                tokenpairs[1].pair
                              );
                            } else {
                              setToggleRemove(!toggleRemove);
                            }
                          }}
                          className="text-white w-44  bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr- mb-2"
                        >
                          Remove Liquidity
                        </button>
                      </td>
                    </tr>
                  </tbody>

                  <tbody>
                    <tr className=" border-b h-28 border-gray-500 text-gray-100">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium  whitespace-nowrap "
                      >
                        {tokenpairs[2].token1Name}
                      </th>
                      <td className="py-4 px-6">{tokenpairs[2].token2Name}</td>
                      <td className="py-4 px-6">
                        {tokenpairs[2].balance.slice(0, 7)}
                      </td>
                      <td className="py-4 px-6 ">
                        <input
                          type="number"
                          id=""
                          className={` ${
                            toggleRemove ? ` visible` : `hidden`
                          } bg-gray-800 text-white border mb-3  lg:w-44 border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                          placeholder="0"
                          required
                          onChange={(e) => setLiquidity(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (toggleRemove) {
                              handleRemoveLiquidity(
                                tokenpairs[2].token1,
                                tokenpairs[2].token2,
                                tokenpairs[2].pair
                              );
                            } else {
                              setToggleRemove(!toggleRemove);
                            }
                          }}
                          className="text-white w-44  bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr- mb-2"
                        >
                          Remove Liquidity
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
