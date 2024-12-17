"use client";

import { InfoPanel } from "@/components/info-panel";
import NavBar from "@/components/nav-bar";
import OrderStepper from "@/components/stepper/order-stepper";
import { useAccount } from "@/components/provider/account.provider";
import { useSDK } from "@metamask/sdk-react";

export default function Home() {
  const { account } = useAccount();
  const { connected } = useSDK();

  return (
    <>
      <NavBar linkTo={"/admin"} ctaName={"Admin"} />
      <div className="max-w-screen-xl mx-auto px-12">
        {connected && account && <OrderStepper />}
        <InfoPanel />
      </div>
    </>
  );
}
