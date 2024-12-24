"use client";
import { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import ABI from "../../lib/abi/OrderManagement.json";
import { Order } from "@/lib/types/admin-order.type";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

const address = "0xC13AF64C19e854dE1a8c444341df7b1651315e10";

export const useProduct = () => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [orders, setOrders] = useState<Order[] | null>(null);

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
        setContract(new ethers.Contract(address, ABI, signer));
      } catch (error) {
        console.error("Failed to initialize contract:", error);
      }
    };

    const getAllOrders = async () => {
      if (!contract) return;
      try {
        const ordersData = await contract.getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    const handleContractReset = () => {
      console.log("Contract has been reset!");
    };

    const listenForEvents = () => {
      if (contract) {
        contract.on("ContractReset", handleContractReset);
      }
    };

    // Initialize contract and fetch orders
    initializeContract();
    getAllOrders();
    listenForEvents();

    return () => {
      if (contract) {
        contract.removeListener("ContractReset", handleContractReset);
      }
    };
  }, []);

  const createOrder = async (productId: number, productName: string, productPrice: number, productQuantity: number) => {
    console.log(contract);
    if (!contract) return;
    try {
      await contract.createOrder(productId, productName, productPrice, productQuantity);
    } catch (error) {
      console.log("Error creating order:", error);
    }
  };

  const markPaymentReceived = async (orderId: string) => {
    if (!contract) return;
    try {
      await contract.markPaymentReceived(orderId);
    } catch (error) {
      console.log("Error marking payment as received:", error);
    }
  };

  const getOrder = async (orderId: string) => {
    if (!contract) return;
    try {
      const orderData = await contract.getOrder(orderId);
      console.log("Order data:", orderData);
      // Handle or store the order data as needed
    } catch (error) {
      console.log("Error fetching order:", error);
    }
  };

  return {
    orders,
    createOrder,
    markPaymentReceived,
    getOrder,
  };
};