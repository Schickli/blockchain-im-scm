// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { ethers, Contract } from "ethers";
// import ABI from "../../lib/abi/OrderManagement.json";
// import { Order } from "@/lib/types/admin-order.type";

// declare global {
//   interface Window {
//     ethereum: any; // Ethereum provider (e.g., MetaMask)
//   }
// }

// const CONTRACT_ADDRESS = "0xC13AF64C19e854dE1a8c444341df7b1651315e10";

// export const useProduct = () => {
//   const [contract, setContract] = useState<Contract | null>(null);
//   const [orders, setOrders] = useState<Order[] | null>(null);
//   const [contractLoading, setContractLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Initialize the contract
//   const initializeContract = useCallback(async () => {
//     if (contract) return contract;

//     try {
//       const { ethereum } = window;
//       if (!ethereum) throw new Error("Ethereum provider not found. Please install MetaMask.");

//       const provider = new ethers.BrowserProvider(ethereum);
//       const signer = await provider.getSigner();
//       const newContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
//       setContract(newContract);
//       return newContract;
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to initialize contract.");
//       console.error("Error initializing contract:", err);
//       return null;
//     }
//   }, [contract]);

//   // Fetch all orders
//   const getAllOrders = useCallback(async () => {
//     const activeContract = await initializeContract();
//     if (!activeContract) return;

//     setContractLoading(true);
//     try {
//       const ordersData = await activeContract.getAllOrders();
//       setOrders(ordersData);
//       console.log("Fetched orders:", ordersData);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch orders.");
//       console.error("Error fetching orders:", err);
//     } finally {
//       setContractLoading(false);
//     }
//   }, [initializeContract]);

//   // Create a new order
//   const createOrder = useCallback(
//     async (productId: number, productName: string, productPrice: number, productQuantity: number) => {
//       const activeContract = await initializeContract();
//       if (!activeContract) return;

//       setContractLoading(true);
//       try {
//         await activeContract.createOrder(productId, productName, productPrice, productQuantity);
//         console.log("Order created successfully.");
//         getAllOrders(); // Refresh orders after creation
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to create order.");
//         console.error("Error creating order:", err);
//       } finally {
//         setContractLoading(false);
//       }
//     },
//     [initializeContract, getAllOrders]
//   );

//   // Mark payment as received for an order
//   const markPaymentReceived = useCallback(
//     async (orderId: string) => {
//       const activeContract = await initializeContract();
//       if (!activeContract) return;

//       setContractLoading(true);
//       try {
//         await activeContract.markPaymentReceived(orderId);
//         console.log("Payment marked as received for order:", orderId);
//         getAllOrders(); // Refresh orders after updating payment status
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to mark payment as received.");
//         console.error("Error marking payment as received:", err);
//       } finally {
//         setContractLoading(false);
//       }
//     },
//     [initializeContract, getAllOrders]
//   );

//   // Get a specific order by ID
//   const getOrder = useCallback(
//     async (orderId: string) => {
//       const activeContract = await initializeContract();
//       if (!activeContract) return;

//       setContractLoading(true);
//       try {
//         const orderData = await activeContract.getOrder(orderId);
//         console.log("Fetched order data:", orderData);
//         return orderData;
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "Failed to fetch order.");
//         console.error("Error fetching order:", err);
//         return null;
//       } finally {
//         setContractLoading(false);
//       }
//     },
//     [initializeContract]
//   );

//   // Effect to listen for contract events
//   useEffect(() => {
//     const handleContractReset = async () => {
//       console.log("Contract has been reset!");
//       await getAllOrders();
//     };

//     initializeContract().then((activeContract) => {
//       if (activeContract) {
//         activeContract.on("ContractReset", handleContractReset);
//       }
//     });

//     return () => {
//       contract?.removeListener("ContractReset", handleContractReset);
//     };
//   }, [contract, getAllOrders, initializeContract]);

//   return {
//     contract,
//     orders,
//     loading: contractLoading,
//     error,
//     createOrder,
//     markPaymentReceived,
//     getOrder,
//     getAllOrders,
//   };
// };