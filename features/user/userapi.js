import Web3 from "web3";
import { abi, contractAddress } from "./util";
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
    console.log(web3.eth.defaultAccount);
    try {
      let cert = await new web3.eth.Contract(abi, contractAddress);
      await cert.methods
        .setCertificate(
          formData.name,
          formData.desc,
          formData.awarder,
          formData.awardee,
          formData.remark,
          2
        )
        .send({ from: web3.eth.defaultAccount })
        .on("error", (error) => {
          console.log(error.message);
        })
        .on("receipt", (receipt) => {
          let returnData = {
            name: receipt.events.Certificate.returnValues.name,
            level: receipt.events.Certificate.returnValues.level,
          };
          console.log(returnData);
        });
    } catch (e) {
      console.log(e);
    }
  }
};
