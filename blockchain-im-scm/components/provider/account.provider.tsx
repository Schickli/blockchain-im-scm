"use client";

import { createContext, useContext, useState } from "react";

const AccountContext = createContext<{
  account: string | undefined;
  setAccount: React.Dispatch<React.SetStateAction<string | undefined>>;
} | undefined>(undefined);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

export const AccountProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [account, setAccount] = useState<string>();

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};