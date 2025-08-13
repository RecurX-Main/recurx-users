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

