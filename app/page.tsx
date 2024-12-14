import { InfoPanel } from "@/components/info-panel";
import NavBar from "@/components/nav-bar";
import OrderStepper from "@/components/stepper/order-stepper";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="max-w-screen-xl mx-auto px-12">
        <OrderStepper />
        <InfoPanel />
      </div>
    </div>
  );
}
