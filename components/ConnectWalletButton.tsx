"use client";
import { Button } from "./ui/button";
import { useSDK } from "@metamask/sdk-react";
import { AccountInfo } from "./AccountInfo";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

export const ConnectWalletButton = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, chainId } = useSDK();

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const provider = sdk?.getProvider();
        if (provider) {
          const accounts = await provider.request({
            method: "eth_accounts",
          });
          if (accounts && (accounts as string[]).length > 0) setAccount((accounts as string[])[0]);
        }
      } catch (err) {
        console.warn("Error checking connection:", err);
      }
    };
    checkConnection();
  }, [sdk]);

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts?.length) setAccount(accounts[0]);
    } catch (err) {
      console.warn("Failed to connect:", err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
      setAccount(undefined);
    }
  };

  return (
    <div className="relative">
      {connected && account ? (
        <AccountInfo account={account} chainId={chainId} disconnect={disconnect} />
      ) : (
        <Button disabled={connecting} onClick={connect}>
          <Plus className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </div>
  );
};
