import { Contract } from "@ethersproject/contracts";

<<<<<<< HEAD
export const contractAddress = "0x3423A21a3cc2d53e8d15cA66419A6BA90aFE477F"; // on changera
export const tokenPrice = 10; //
export const contractChainId = 4;
export const maxMint = 1950;
export const MAX_SUPPLY = 6500;
=======
export const contractAddress = "0x215de2b3B83f12D71C61861E318AcEC94b47e52D"; // on changera
export const tokenPrice = 10; //
export const contractChainId = 5;
export const maxMint = 1830;
export const MAX_SUPPLY = 6100;
<<<<<<< HEAD
>>>>>>> origin/web3-marico
=======
export const symbol = "203rdSM-R";
export const scan = "https://goerli.etherscan.io/address/";
>>>>>>> origin/web3-marico
export const getContract = (library: any, account: string) => {
  // console.log(library);
  const signer = library.getSigner(account).connectUnchecked();
  const contract = new Contract(contractAddress, contractAbi, signer);
  return contract;
};
export const contractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Buying",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
<<<<<<< HEAD
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
=======
      { indexed: false, internalType: "uint8", name: "version", type: "uint8" },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
>>>>>>> origin/web3-marico
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
<<<<<<< HEAD
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
=======
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
>>>>>>> origin/web3-marico
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
<<<<<<< HEAD
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
=======
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
>>>>>>> origin/web3-marico
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
<<<<<<< HEAD
      {
        indexed: true,
        internalType: "address",
        name: "from",
=======
      { indexed: true, internalType: "bytes32", name: "role", type: "bytes32" },
      {
        indexed: true,
        internalType: "address",
        name: "account",
>>>>>>> origin/web3-marico
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
<<<<<<< HEAD
        name: "to",
        type: "address",
      },
=======
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
>>>>>>> origin/web3-marico
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
<<<<<<< HEAD
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
=======
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_SUPPLY",
<<<<<<< HEAD
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
=======
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOKENPRICE",
<<<<<<< HEAD
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
=======
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
=======
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
=======
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
>>>>>>> origin/web3-marico
    stateMutability: "nonpayable",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
=======
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
=======
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
>>>>>>> origin/web3-marico
    ],
    name: "buy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
<<<<<<< HEAD
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
=======
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
=======
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "role", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
>>>>>>> origin/web3-marico
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
=======
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
>>>>>>> origin/web3-marico
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "_bank",
        type: "address",
      },
      {
        internalType: "address",
        name: "_currencyUsed",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
=======
      { internalType: "address", name: "_bank", type: "address" },
      { internalType: "address", name: "multisig", type: "address" },
      { internalType: "address", name: "_currencyUsed", type: "address" },
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
>>>>>>> origin/web3-marico
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
<<<<<<< HEAD
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
=======
    outputs: [{ internalType: "string", name: "", type: "string" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
=======
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
=======
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "value", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
>>>>>>> origin/web3-marico
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
<<<<<<< HEAD
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
=======
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
    ],
    name: "setAllowListMerkleRoot",
=======
    inputs: [
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "renounceRole",
>>>>>>> origin/web3-marico
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "uint32",
        name: "_cexRatioX10000",
        type: "uint32",
      },
    ],
    name: "setCexRatio",
=======
      { internalType: "bytes32", name: "role", type: "bytes32" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "revokeRole",
>>>>>>> origin/web3-marico
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [
      {
        internalType: "contract IERC20",
        name: "currencyToUse",
        type: "address",
      },
    ],
    name: "setCurrency",
=======
    inputs: [{ internalType: "bytes32", name: "merkleRoot", type: "bytes32" }],
    name: "setAllowListMerkleRoot",
>>>>>>> origin/web3-marico
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "uint128",
        name: "_maxToBuy",
        type: "uint128",
      },
    ],
    name: "setMaxToBuy",
=======
      { internalType: "uint32", name: "_cexRatioX10000", type: "uint32" },
    ],
    name: "setCexRatio",
>>>>>>> origin/web3-marico
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [
      {
        internalType: "uint256",
        name: "step",
        type: "uint256",
      },
    ],
=======
    inputs: [{ internalType: "uint256", name: "step", type: "uint256" }],
>>>>>>> origin/web3-marico
    name: "setStep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
=======
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
<<<<<<< HEAD
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokensBought",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
=======
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "tokensBought",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
<<<<<<< HEAD
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
=======
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
>>>>>>> origin/web3-marico
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
=======
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
>>>>>>> origin/web3-marico
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
=======
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
>>>>>>> origin/web3-marico
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
=======
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
>>>>>>> origin/web3-marico
    ],
    name: "transferFromWithPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
=======
      { internalType: "address", name: "newImplementation", type: "address" },
>>>>>>> origin/web3-marico
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
<<<<<<< HEAD
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
=======
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
>>>>>>> origin/web3-marico
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "variables",
    outputs: [
<<<<<<< HEAD
      {
        internalType: "enum Step",
        name: "step",
        type: "uint8",
      },
      {
        internalType: "uint32",
        name: "cexRatioX10000",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
      {
        internalType: "uint128",
        name: "MaxToBuy",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "bank",
        type: "address",
      },
=======
      { internalType: "enum Step", name: "step", type: "uint8" },
      { internalType: "uint32", name: "cexRatioX10000", type: "uint32" },
      { internalType: "bytes32", name: "merkleRoot", type: "bytes32" },
      { internalType: "uint128", name: "MaxToBuy", type: "uint128" },
      { internalType: "address", name: "bank", type: "address" },
>>>>>>> origin/web3-marico
      {
        internalType: "contract IERC20",
        name: "currencyUsed",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
