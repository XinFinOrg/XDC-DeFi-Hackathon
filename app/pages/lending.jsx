import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import styles from "../styles/Home.module.css";
import { tokens } from "../utils/tokens";
import Loader from "../components/Loader";
import Link from "next/link";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import {
  LENDING_CONTRACT_ABI,
  LENDING_CONTRACT_ADDRESS,
  Token_ABI,
} from "../constants/Index";
import { Contract, ethers } from "ethers";

export default function Lending() {
  const [expand, setExpand] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [toggleSupply, setToggleSupply] = useState(false);
  const [toggleBorrow, setToggleBorrow] = useState(false);
  const [toggleWithdraw, setToggleWithdraw] = useState(false);
  const [toggleRepay, setToggleRepay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const [lendAmount, setLendAmount] = useState(0);
  const [borrowedAmount, setBorrowedAmount] = useState(0);

  const [supplyAmount, setSupplyAmount] = useState(0);
  const [borrowAmount, setBorrowAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [repayAmount, setRepayAmount] = useState(0);

  const [poolAddress, setPoolAddress] = useState();
  const [toBorrow, setToBorrow] = useState();

  const provider = useProvider();
  const { data: signer } = useSigner();

  const contract = useContract({
    address: LENDING_CONTRACT_ADDRESS,
    abi: LENDING_CONTRACT_ABI,
    signerOrProvider: signer || provider,
  });

  const { address } = useAccount();

  const getConnectedUserBalance = async () => {
    try {
      const _balance = await contract.getBalance(selectedToken.address);
      setUserBalance(ethers.utils.formatEther(_balance.toString()).slice(0, 7));
    } catch (err) {
      console.error(err);
    }
  };
  const getPoolAddress = async () => {
    try {
      const data = await contract.getPoolAddress(selectedToken.address);
      console.log(data);
      setPoolAddress(data);
      getPoolBalance(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPoolBalance = async (_poolAddress) => {
    try {
      const token_contract = new Contract(
        selectedToken.address,
        Token_ABI,
        provider
      );
      const data = await token_contract.balanceOf(_poolAddress);
      console.log(ethers.utils.formatEther(data));
      setToBorrow(ethers.utils.formatEther(data).slice(0, 6));
    } catch (err) {
      console.log(err);
    }
  };

  const createPool = async () => {
    try {
      // here in the param add the address of the token you want to create a lending pool for
      const _createPool = await contract.createPool(selectedToken.address);
      setLoading(true);
      await _createPool.wait();
      setLoading(false);
      // toast.success("Pool created!!!");
    } catch (err) {
      console.error(err);
    }
  };

  const getRepaidAmount = async (_amount) => {
    try {
      // first param takes address of token and then user and amount for now it's hardcoded
      const _amount = await contract.getRepayAmount(
        selectedToken.address,
        address,
        _amount
      );
      // save in some state
    } catch (err) {
      console.error(err);
    }
  };

  const getWithdrawalAmount = async () => {
    try {
      // first param takes address of token and then user and withdrawAmount but for now it's hardcoded
      const _withdraw = await contract.getWithdrawAmount(
        selectedToken.address,
        address,
        _amount
      );
      // save in some state
    } catch (err) {
      console.error(err);
    }
  };

  const handleSupply = async () => {
    if (selectedToken) {
      if (selectedToken.symbol == "XDC") {
        depositEther();
      } else {
        depositToken();
      }
    }
  };

  const handleBorrow = async () => {
    if (selectedToken) {
      if (selectedToken.symbol == "XDC") {
        borrowEther();
      } else {
        borrowToken();
      }
    }
  };

  const handleWithdraw = async () => {
    if (selectedToken) {
      if (selectedToken.symbol == "XDC") {
        withdrawEther();
      } else {
        withdrawToken();
      }
    }
  };

  const handleRepay = async () => {
    if (selectedToken) {
      if (selectedToken.symbol == "XDC") {
        repayEther();
      } else {
        repayToken();
      }
    }
  };

  const approveTokens = async (tokenInAddress, spender, amountIn) => {
    try {
      const Token_contract = new Contract(tokenInAddress, Token_ABI, signer);

      const tx = await Token_contract.approve(
        spender,
        ethers.utils.parseEther(amountIn.toString())
      );

      await tx.wait();
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const depositToken = async () => {
    try {
      if (supplyAmount) {
        const _amount = ethers.utils.parseEther(supplyAmount.toString());
        // await approveTokens(selectedToken.address, poolAddress, _amount);
        // first param takes address of the token and second one takes amount
        const txn = await contract.depositToken(selectedToken.address, _amount);
        setLoading(true);
        await txn.wait();
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const withdrawToken = async () => {
    try {
      if (withdrawAmount) {
        const _amount = ethers.utils.parseEther(withdrawAmount.toString());
        const amountWithdraw = getWithdrawalAmount(_amount);
        const txn = await contract.withdrawToken(
          selectedToken.address,
          amountWithdraw
        );
        setLoading(true);
        await txn.wait();
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const borrowToken = async () => {
    try {
      if (borrowAmount) {
        const _amount = ethers.utils.parseEther(borrowAmount.toString());

        const txn = await contract.borrowToken(selectedToken.address, _amount);
        setLoading(true);
        await txn.wait();
        setLoading(false);
        // add some toaster i guess
      }
    } catch (err) {
      console.error(err);
    }
  };

  const repayToken = async () => {
    try {
      if (repayAmount) {
        const _amount = ethers.utils.parseEther(repayAmount.toString());
        const amountRepay = getRepaidAmount(_amount);
        const txn = await contract.repayToken(
          selectedToken.address,
          amountRepay
        );
        setLoading(true);
        await txn.wait();
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const depositEther = async () => {
    try {
      if (supplyAmount) {
        const _amount = ethers.utils.parseEther(supplyAmount);

        const _txn = await contract.depositETH(
          {
            value: _amount, //add some number here dhruv
          },
          _amount
        );
        setLoading(true);
        await _txn.wait();
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const withdrawEther = async () => {
    try {
      if (withdrawAmount) {
        const _amount = ethers.utils.parseEther(withdrawAmount);
        const amountWithdraw = getWithdrawalAmount(_amount);
        const _txn = await contract.withdrawETH(amountWithdraw);
        setLoading(true);
        await _txn.wait();
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const borrowEther = async () => {
    try {
      if (borrowAmount) {
        const _amount = ethers.utils.parseEther(borrowAmount);
        const _txn = await contract.borrowETH(_amount);
        setLoading(true);
        await _txn.wait();
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const repayEther = async () => {
    try {
      if (repayAmount) {
        const _amount = ethers.utils.parseEther(repayAmount);
        const amountRepay = getRepaidAmount(_amount);
        const _txn = await contract.repayETH(
          {
            value: amountRepay, // input any value here you want the user to pay
          },
          amountRepay
        );
        setLoading(true);
        await _txn.wait();
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLentAmount = async () => {
    try {
      const _lendAmount = await contract.getLendAmount(
        selectedToken.address,
        address
      );
      const amount = ethers.utils.formatEther(_lendAmount.toString());
      setLendAmount(amount);
      console.log(amount);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchBorrowedAmount = async () => {
    try {
      const _borrowedAmount = await contract.getBorrowAmount(
        selectedToken.address,
        address
      );
      const amount = ethers.utils.formatEther(_borrowedAmount.toString());
      console.log(amount);
      setBorrowedAmount(amount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedToken) {
      getPoolAddress();
      getConnectedUserBalance();
      fetchLentAmount();
      fetchBorrowedAmount();
    }
  }, [selectedToken]);

  return (
    <div
      className={`w-screen min-h-screen no-repeat bg-cover bg-[#03071E]
        ${
          !expand
            ? `${styles.bg} bg-[url('../assets/landing.png')]`
            : `bg-[#03071E]`
        }
          `}
    >
      <Navbar expand={expand} setExpand={setExpand} />
      {expand ? null : (
        <>
          <div className=" w-full mt-10 flex flex-col justify-center items-center px-2 pb-10">
            <div className="w-full flex flex-col lg:w-5/12 justify-around">
              <h1 className=" text-gray-100 text-3xl font-semibold">Lending</h1>
            </div>

            <span className="mt-5 lg:w-5/12 bg-orange-500 opacity-90 px-6 py-4 text-md font-normal rounded-md">
            XDC-Fi allows users to lend different tokens including customly deployed ones, users can also borrow, withdraw, Repay and supply tokens by interacting with the lending-contract.
            </span>
            <div
              className={` mt-8 lg:w-5/12 border rounded-lg border-gray-500 px-4 py-6 bg-transparent backdrop-blur-xl`}
            >
              <div className=" flex items-center justify-between">
                <div className=" text-gray-100  flex  items-center text-lg font-semibold">
                  Lend
                  <Listbox
                    className=" ml-3"
                    value={selectedToken}
                    onChange={setSelectedToken}
                  >
                    <div className="relative mt-0">
                      <Listbox.Button className="relative  cursor-default rounded-md w-28 lg:w-36 px-4 py-2.5 bg-gray-700 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          {selectedToken.symbol}
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
                        <Listbox.Options className="absolute mt-1 max-h-60 w-36 z-[100] overflow-auto rounded-md  bg-gray-900  backdrop-blur-xl py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                              {({ selectedToken }) => (
                                <>
                                  <span
                                    className={`block truncate  ${
                                      selectedToken
                                        ? "font-medium"
                                        : "font-normal"
                                    }`}
                                  >
                                    {token.symbol}
                                  </span>
                                  {selectedToken ? (
                                    <span className="absolute  inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
                <Link href="/xdc">
                  <button
                    type="button"
                    className=" flex hover:scale-105 transition ease-in-out items-center w- ml-6 mt-2 hover:bg-transparent border hover:border-gray-300 rounded-md opacity-90 text-xs font-semibold font-fredoka text-white px-3 py-2 mr-2 mb-2"
                  >
                    <img
                      className=" w-5 mr-2"
                      src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-wallet-interface-kiranshastry-lineal-kiranshastry.png"
                    />
                    Buy XDC
                  </button>
                </Link>
              </div>

              <div className=" flex  justify-between w-full">
                <div class="mt-4 relative border w-full mr-2 text-white border-gray-500 py-4 px-6 rounded-md flex flex-col wf items-center justify-between">
                  <div className="flex my-2 w-full justify-between items-center">
                    <div>Wallet Balance</div>
                    <div>{userBalance}</div>
                  </div>
                  <div className="flex my-2 w-full justify-between items-center">
                    <div>Available to supply</div>
                    <div>{userBalance}</div>
                  </div>
                  <div className="flex my-2 w-full justify-between items-center">
                    <div>Available to borrow</div>
                    <div>{toBorrow}</div>
                  </div>
                </div>
                <div class="mt-4 relative border w-full ml-2 text-white border-gray-500 py-4 px-6 rounded-md flex flex-col wf items-center justify-between">
                  <div className="flex my-2 w-full justify-between items-center">
                    <div>Supplied amount</div>
                    <div>{lendAmount}</div>
                  </div>
                  <div className="flex my-2 w-full justify-between items-center">
                    <div>Borrowed amount</div>
                    <div>{borrowedAmount}</div>
                  </div>
                  <div className="flex my-2 w-full justify-between items-center">
                    <div>Interest</div>
                    <div>13 %</div>
                  </div>
                </div>
              </div>

              <div className=" flex justify-between items-center">
                <div>
                  <button
                    onClick={() => {
                      setToggleSupply(!toggleSupply);
                      setToggleBorrow(false);
                    }}
                    type="button"
                    className="text-white mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr- mb-2"
                  >
                    Supply
                  </button>
                  <button
                    onClick={() => {
                      setToggleBorrow(!toggleBorrow);
                      setToggleSupply(false);
                    }}
                    type="button"
                    className="text-white  mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 ml-4 mb-2"
                  >
                    Borrow
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => {
                      setToggleWithdraw(!toggleWithdraw);
                      setToggleRepay(false);
                      setToggleBorrow(false);
                      setToggleSupply(false);
                    }}
                    type="button"
                    className="text-white mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mr- mb-2"
                  >
                    Withdraw
                  </button>
                  <button
                    onClick={() => {
                      setToggleRepay(!toggleRepay);
                      setToggleWithdraw(false);
                      setToggleBorrow(false);
                      setToggleSupply(false);
                    }}
                    type="button"
                    className="text-white  mt-6 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 ml-4 mb-2"
                  >
                    Re-pay
                  </button>
                </div>
              </div>

              <div className={`${toggleWithdraw ? "visible" : "hidden"} `}>
                <input
                  type="number"
                  id=""
                  className={` mt-5 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="0"
                  required
                  onChange={(e) => {
                    setWithdrawAmount(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="text-white w-full  mt-4 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mb-2"
                  onClick={() => handleWithdraw()}
                >
                  Submit WithDraw
                </button>
              </div>
              <div className={`${toggleRepay ? "visible" : "hidden"} `}>
                <input
                  type="number"
                  id=""
                  className={` mt-5 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="0"
                  required
                  onChange={(e) => {
                    setRepayAmount(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="text-white w-full  mt-4 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mb-2"
                  onClick={() => handleRepay()}
                >
                  Submit Repay
                </button>
              </div>

              <div className={`${toggleSupply ? "visible" : "hidden"} `}>
                <input
                  type="number"
                  id=""
                  className={` mt-5 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="0"
                  required
                  onChange={(e) => {
                    setSupplyAmount(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="text-white w-full  mt-4 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mb-2"
                  onClick={() => handleSupply()}
                >
                  Submit Supply
                </button>
              </div>
              <div className={`${toggleBorrow ? "visible" : "hidden"} `}>
                <input
                  type="number"
                  id=""
                  className={` mt-5 bg-gray-800 text-white border  lg:w-full border-gray-300  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="0"
                  required
                  onChange={(e) => {
                    setBorrowAmount(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="text-white w-full  mt-4 bg-orange-600 text-md font-fredoka active:bg-orange-700 font-medium rounded-sm px-5 py-2.5 mb-2"
                  onClick={() => handleBorrow()}
                >
                  Submit Borrow
                </button>
              </div>
            </div>
          </div>
          {/* <Loader msg={"Message here  "} /> */}
        </>
      )}
      <Footer />
    </div>
  );
}
