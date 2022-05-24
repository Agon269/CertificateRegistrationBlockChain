export const contractAddress = "0xb9886EEEADEeDE80Da9CB5A150a7f98d9Cb25B68";
export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "level",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "desc",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "awarder",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "awardee",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "remark",
        type: "string",
      },
    ],
    name: "Certificate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_desc",
        type: "string",
      },
      {
        internalType: "string",
        name: "_awardee",
        type: "string",
      },
      {
        internalType: "string",
        name: "_awarder",
        type: "string",
      },
      {
        internalType: "string",
        name: "_remark",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_level",
        type: "uint256",
      },
    ],
    name: "setCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCertificate",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
