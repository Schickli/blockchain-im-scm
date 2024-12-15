"use client";
import { ethers, Contract } from "ethers";
import { useState, useEffect } from "react";
// TODO: Replace with the ABI of the product contract
import ABI from "../../lib/abi/hello-world.json";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

// TODO: Replace with the address of the product contract
const address = "0xE0a239B587426b7B8fb3b59609c416026dd11704";

const useProductContract = () => {
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          console.error("Ethereum provider not found.");
          return;
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(address, ABI, signer);

        setContract(contract);
      } catch (error) {
        console.error("Failed to initialize contract:", error);
      }
    };

    initializeContract();
  }, []);

  return contract;
};

export default useProductContract;