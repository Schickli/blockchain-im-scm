"use client";

import { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import ABI from "../../lib/abi/OrderManagement.json";

const CONTRACT_ADDRESS = "0xC13AF64C19e854dE1a8c444341df7b1651315e10";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useContract = () => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [isContractLoading, setIsContractLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeContract = async () => {
      setIsContractLoading(true);
      setError(null);

      try {
        const { ethereum } = window;
        if (!ethereum) {
          throw new Error("Ethereum provider not found.");
        }

        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const newContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        setContract(newContract);
      } catch (err: any) {
        setError(err.message || "Failed to initialize contract.");
        console.error("Failed to initialize contract:", err);
      } finally {
        setIsContractLoading(false);
      }
    };

    initializeContract();
  }, []);

  return { contract, loading: isContractLoading, error, CONTRACT_ADDRESS };
};