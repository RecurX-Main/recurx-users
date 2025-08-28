export const generateSmartContract = async (message: string) => {
  try {
    const response = await fetch("/api/v1/smartcontract/generatecontract", {
      method: "POST",
      body: JSON.stringify(message),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const auditSmartContract = async (message: string) => {
  try {
    const response = await fetch("/api/v1/smartcontract/auditcontract", {
      method: "POST",
      body: JSON.stringify(message),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const connectWalletHandler = async (address: string) => {
  try {
    const response = await fetch("/api/v1/wallet", {
      method: "POST",
      body: JSON.stringify({
        wallet: address,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchWalletInfo = async () => {
  try {
    const response = await fetch("/api/v1/wallet", {
      method: "GET",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const findUserWallet = async (option: string, info: string) => {
  try {
    const response = await fetch("/api/v1/findwallet", {
      method: "POST",
      body: JSON.stringify({
        option: option === "address" ? "address" : "email",
        address: info,
        email: info,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const findUsersTransactions = async (address: string) => {
  try {
    const response = await fetch(`/api/v1/transcations?address=${address}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
