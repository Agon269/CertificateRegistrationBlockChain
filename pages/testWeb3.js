import { useEffect, useState } from "react";
import Web3 from "web3";
import Error from "next/error";
export default function Home() {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const abi = [
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
    },
  ];
  let contractAddress = "0x437098c2D2F9E4aE42af668135b37D6DAd05CeC8";

  async function init() {
    const web3 = new Web3("ws://localhost:7545");
    console.log(web3.eth.getAccounts());
    let cert = await new web3.eth.Contract(abi, contractAddress);
    let accounts = await web3.eth.getAccounts();

    web3.eth.defaultAccount = accounts[1];

    //on updating recieve result and update code
    await cert.methods
      .setCertificate("Dave", 3)
      .send({ from: web3.eth.defaultAccount })
      .on("error", (error) => {
        console.log(error.message);
        setError(error.message);
      })
      .on("receipt", (receipt) => {
        console.log(receipt);
        let returnData = {
          name: receipt.events.Certificate.returnValues.name,
          level: receipt.events.Certificate.returnValues.level,
        };
        setData(returnData);
      });

    // let dits = await cert.methods.getCertificate().call();
    // let returnData = {
    //   name: dits[0],
    //   level: dits[1],
    // };
    // setData(returnData);
  }
  return (
    <div>
      <button onClick={(e) => init()}>here</button>
      <p>{data.name}</p>
      <p>{data.level}</p>
      <p>{error && error}</p>
    </div>
  );
}
