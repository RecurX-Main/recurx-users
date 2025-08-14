import { ethers } from "ethers";
const ERC20_ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)",
];

export const Provider = async () => {
  // @ts-ignore
  if (window.ethereum) {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    return signer;
  } else {
    alert("MetaMask not found");
  }
};

export const connectWallet = async () => {
  try {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    return address as string;
  } catch (error) {
    return error;
  }
};

export const sendToken = async (toAddress: string, amount: number) => {
  try {
    const signer = await Provider();
    const tokenContract = new ethers.Contract(
      "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
      ERC20_ABI,
      signer
    );
    const parsedAmount = ethers.parseEther(amount.toString());
    const tx = await tokenContract.transfer(toAddress, parsedAmount);
    await tx.wait();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchFunds = async () => {
  // @ts-ignore
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);
  const funds = ethers.formatEther(balance).toString();
  return funds;
};
