"use client"

import React, { createContext, useContext, useState } from "react";

interface OrderContextType {
  currentOrderId: string | null;
  setCurrentOrderId: (orderId: string | null) => void;
}

const OrderContext = createContext<OrderContextType>({
  currentOrderId: null,
  setCurrentOrderId: () => {},
});

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  return (
    <OrderContext.Provider value={{ currentOrderId, setCurrentOrderId }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
