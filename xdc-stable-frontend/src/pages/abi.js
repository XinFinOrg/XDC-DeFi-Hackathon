export const contractaddr = "0xA8d4A4054A3D662146E0B6AA3C8bcFA902E0a098"


export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositpli",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanid",
				"type": "uint256"
			}
		],
		"name": "disburseloan",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllLoan",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "loanid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "interest",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "period",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reqtimestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "initiator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amountxdc",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountrawxdc",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "status",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "completed",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "liquidated",
						"type": "bool"
					}
				],
				"internalType": "struct Stable.loan[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMyLoan",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "loanid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "interest",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "period",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reqtimestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "initiator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amountxdc",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountrawxdc",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "status",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "completed",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "liquidated",
						"type": "bool"
					}
				],
				"internalType": "struct Stable.loan[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPriceInfo",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "period",
				"type": "uint256"
			}
		],
		"name": "getloan",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanid",
				"type": "uint256"
			}
		],
		"name": "liquidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "loanid",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "loans",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "loanid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "interest",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "period",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "reqtimestamp",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "initiator",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountxdc",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountrawxdc",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "completed",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "liquidated",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanid",
				"type": "uint256"
			}
		],
		"name": "readloan",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "loanid",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "interest",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "period",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reqtimestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "initiator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amountxdc",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountrawxdc",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "status",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "completed",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "liquidated",
						"type": "bool"
					}
				],
				"internalType": "struct Stable.loan",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "loanid",
				"type": "uint256"
			}
		],
		"name": "repayloan",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "requestId",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "show",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapRouter",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router02",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

