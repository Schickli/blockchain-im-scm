"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";

export function MetaMaskClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const host =
    typeof window !== "undefined"
      ? window.location.host
      : "http://localhost:3000";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Blockchain-in-SCM",
      url: host,
    },
  };

  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
      {children}
    </MetaMaskProvider>
  );
}