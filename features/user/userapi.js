import Web3 from "web3";
import { abi, contractAddress, hash, makeid } from "./util";
export async function fetchUserDataApi(formData) {
  const currentProvider = detectCurrentProvider();
  if (currentProvider) {
    if (currentProvider !== window.ethereum) {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    await currentProvider.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(currentProvider);
    const userAccount = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();
    const account = userAccount[0];
    let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
    ethBalance = web3.utils.fromWei(ethBalance, "ether"); //Convert balance to wei
    saveUserInfo(
      ethBalance,
      account,
      chainId,
      formData.image,
      formData.institution
    );

    if (userAccount.length === 0) {
      console.log("Please connect to meta mask");
    }
    let userInfo = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
      institution: formData.institution,
      image: formData.image,
    };

    return userInfo;
  } else {
    return "error";
  }
}

export const detectCurrentProvider = () => {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }

  return provider;
};
const saveUserInfo = (ethBalance, account, chainId, image, institution) => {
  const userAccount = {
    account: account,
    balance: ethBalance,
    connectionid: chainId,
    image,
    institution,
  };
  window.localStorage.setItem("userAccount", JSON.stringify(userAccount));
};

export const signOutApi = () => {
  window.localStorage.removeItem("userAccount");
};

//main function
export const registerCertificateApi = async (formData) => {
  const currentProvider = detectCurrentProvider();
  if (currentProvider) {
    if (currentProvider !== window.ethereum) {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    await currentProvider.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(currentProvider);
    const userAccount = await web3.eth.getAccounts();
    const account = userAccount[0];
    let ethBalance = await web3.eth.getBalance(account);
    ethBalance = web3.utils.fromWei(ethBalance, "ether");

    web3.eth.defaultAccount = account;
    //testing string here
    let randomString = makeid(6);
    let Id = await hash(randomString);

    try {
      let cert = await new web3.eth.Contract(abi, contractAddress);
      await cert.methods
        .setHolder(
          Id,
          web3.eth.defaultAccount,
          formData.name,
          formData.level,
          formData.desc,
          formData.awardee,
          formData.awarder,
          formData.remark
        )
        .send({ from: web3.eth.defaultAccount })
        .on("error", (error) => {
          console.log(error.message);
        })
        .on("receipt", (receipt) => {
          let returnData = {
            name: receipt.events.HolderInfo.returnValues.name,
            level: receipt.events.HolderInfo.returnValues.level,
            awardee: receipt.events.HolderInfo.returnValues.awardee,
            awarder: receipt.events.HolderInfo.returnValues.awarder,
            desc: receipt.events.HolderInfo.returnValues.desc,
            remark: receipt.events.HolderInfo.returnValues.remark,
          };
          console.log(returnData);
          return returnData;
        });
    } catch (e) {
      console.log(e);
    }
  }
};

export const getUserCertsApi = async () => {
  const currentProvider = detectCurrentProvider();
  if (currentProvider) {
    if (currentProvider !== window.ethereum) {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    await currentProvider.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(currentProvider);
    const userAccount = await web3.eth.getAccounts();
    const account = userAccount[0];
    let ethBalance = await web3.eth.getBalance(account);
    ethBalance = web3.utils.fromWei(ethBalance, "ether");

    web3.eth.defaultAccount = account;

    try {
      let cert = await new web3.eth.Contract(abi, contractAddress);
      let Ids = await cert.methods.getUserCerts(web3.eth.defaultAccount).call();
      let contracts = [];
      for (let i = 0; i < Ids.length; i++) {
        let temp = await cert.methods.getCertificate(Ids[i]).call();
        let obj = {
          certName: temp["0"],
          level: temp["1"],
          description: temp["2"],
          awardee: temp["3"],
          awarder: temp["4"],
          institution: temp["5"],
        };
        contracts = [...contracts, { ...obj }];
      }
      return contracts;
    } catch (e) {
      console.log(e);
    }
  }
  return ["1"];
};
