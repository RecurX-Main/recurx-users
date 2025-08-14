import { createContext, useContext } from "react";

export const walletContext = createContext({
  address: "",
  useAddress :(arg:string)=>{},
  disConnectWallet :()=>{}
});

export const useWallet = () => {
  const context = useContext(walletContext);
  if (!context) {
    throw new Error("Wallet context is required");
  }
  return context;
};
