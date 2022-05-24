import Web3 from "web3";
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
  const userData = JSON.parse(localStorage.getItem("userAccount"));
};

export const signOutApi = () => {
  window.localStorage.removeItem("userAccount");
};
