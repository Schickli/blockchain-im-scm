"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import Link from "next/link";

export const NavBar = () => {
    const host =
      typeof window !== "undefined" ? window.location.host : "http://localhost:3000";
  
    const sdkOptions = {
      logging: { developerMode: false },
      checkInstallationImmediately: false,
      dappMetadata: {
        name: "Blockchain-in-SCM",
        url: host, // using the host constant defined above
      },
    };
  
    return (
      <nav className="flex items-center justify-between max-w-screen-xl px-6 mx-auto py-7 rounded-xl">
        <Link href="/" className="flex gap-1 px-6">
          <span className="hidden text-2xl font-bold sm:block">
            <span className="text-gray-900">Blockchain im SCM</span>
          </span>
        </Link>
        <div className="flex gap-4 px-6">
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <ConnectWalletButton />
          </MetaMaskProvider>
        </div>
      </nav>
    );
  };
  
  export default NavBar;  