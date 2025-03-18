"use client";

import { useState } from "react";
import { ShoppingCart, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StepIndicator from "./step-indicator";
import ProductStep from "./product-step";
import PaymentStep from "./payment-step";
import LoadingStep from "./loading-step";
import ConfirmationStep from "./confirmation-step";
import SuccessStep from "./sucess-step";
import { Product, products } from "@/lib/types/product.type";
import { Step } from "@/lib/types/step.type";
import { useContract } from "../hooks/contract.hook";
import { useOrderContext } from "../provider/order.provider";

// Actions
const createOrderAction = async (
  product: Product,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contract: any,
  setIsLoading: (value: boolean) => void,
  setCurrentOrderId: (orderId: string) => void
): Promise<boolean> => {
  if (!contract) {
    console.error("Contract not initialized.");
    return false;
  }

  try {
    setIsLoading(true);
    const result = await contract.createOrder(
      product.id,
      product.name,
      product.price,
      product.quantity
    );
    console.log("Order created successfully.", result);

    const receipt = await result.wait();
    console.log("Transaction mined:", receipt);

    const orderCreatedEvent = receipt.events?.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (event: any) => event.event === "OrderCreated"
    );

    if (!orderCreatedEvent) {
      console.error("OrderCreated event not found");
      return false;
    }

    const orderId = orderCreatedEvent.args?.orderId;
    console.log("Order ID:", orderId);
    setCurrentOrderId(orderId.toString());

    return true;
  } catch (err) {
    console.error("Error placing order:", err);
    return false;
  } finally {
    setIsLoading(false);
  }
};

const paymentAction = async (
  product: Product,
  setIsLoading: (value: boolean) => void
): Promise<boolean> => {
  console.log("Paying for product:", product);
  setIsLoading(true);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  setIsLoading(false);
  return true;
};

const confirmReceiptAction = async (
  product: Product,
  setIsLoading: (value: boolean) => void
): Promise<boolean> => {
  console.log(`Receipt confirmed for product: ${product.name}`);
  setIsLoading(true);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  setIsLoading(false);
  return true;
};

export default function OrderStepper() {
  const steps = [
    {
      id: 1,
      title: "Bestellung aufgeben",
      icon: ShoppingCart,
      action: {
        cta: "Bestellen",
        action: (product: Product) =>
          createOrderAction(product, contract, setIsLoading, setCurrentOrderId),
        loading: {
          title: "Bestellung wird verarbeitet",
          description:
            "Deine Bestellung wird sicher auf der Blockchain gespeichert.",
        },
        success: {
          title: "Bestellung erfolgreich!",
          description:
            "Deine Bestellung wurde erfolgreich übermittelt und sicher auf der Blockchain gespeichert.",
        },
      },
    },
    {
      id: 2,
      title: "Zahlung leisten",
      icon: CreditCard,
      action: {
        cta: "Zahlen",
        action: (product: Product) => paymentAction(product, setIsLoading),
        loading: {
          title: "Zahlung wird durchgeführt",
          description:
            "Wir verarbeiten deine Zahlung und speichern sie auf der Blockchain.",
        },
        success: {
          title: "Zahlung erfolgreich!",
          description:
            "Deine Zahlung wurde erfolgreich verarbeitet und sicher auf der Blockchain gespeichert.",
        },
      },
    },
    {
      id: 3,
      title: "Empfang bestätigen",
      icon: Package,
      action: {
        cta: "Bestätigen",
        action: (product: Product) =>
          confirmReceiptAction(product, setIsLoading),
        loading: {
          title: "Daten werden übermittelt",
          description:
            "Die Bestätigung wird sicher auf der Blockchain gespeichert.",
        },
        success: {
          title: "Empfang bestätigt!",
          description:
            "Der Empfang wurde erfolgreich bestätigt und die Daten sicher auf der Blockchain gespeichert.",
        },
      },
    },
  ] as Step[];

  const {
    contract,
    loading: contractLoading,
  } = useContract();
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [isError ,setIsError] = useState(false);
  const { setCurrentOrderId } = useOrderContext();

  const handleAction = async () => {
    setIsLoading(true);
    const result = await currentStep.action.action(selectedProduct);
    setIsLoading(false);

    if (result) {
      setIsSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(false);
    } else {
      // setIsError(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // setIsError(false);
    }

    if (result && currentStep.id < steps.length) {
      // if (currentStep.id < steps.length) {
      setCurrentStep(steps[currentStep.id]);
    } else {
      setCurrentStep(steps[0]);
    }
  };

  return (
    <Card className="w-full mb-8 rounded-lg overflow-hidden relative">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2" />
      {contractLoading && (
        <LoadingStep
          title="Smart Contract wird initialisiert"
          description="Bitte warten, während wir die Verbindung zur Blockchain herstellen."
        />
      )}
      {/* {contractError && (
        <ErrorStep
          title="Fehler beim Laden des Smart Contracts"
          description={contractError}
        />
      )} */}
      {isLoading && (
        <LoadingStep
          title={currentStep.action.loading.title}
          description={currentStep.action.loading.description}
        />
      )}
      {isSuccess && (
        <SuccessStep
          title={currentStep.action.success.title}
          description={currentStep.action.success.description}
        />
      )}
      {/* {isError && (
        <ErrorStep
          title="Fehler bei der Kommunikation mit dem Smart Contract"
          description="Es ist bei der Kommunkation mit dem Smart Contract ein Fehler aufgetreten. Bitte versuche es später erneut."
        />
      )} */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Bestell Prozess</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around mb-8">
          {steps.map((step) => (
            <StepIndicator
              key={step.id}
              step={step}
              currentStep={currentStep.id}
            />
          ))}
        </div>
        {currentStep.id === 1 && (
          <ProductStep
            selectedProduct={selectedProduct}
            setSelectProduct={setSelectedProduct}
            products={products}
          />
        )}
        {currentStep.id === 2 && (
          <PaymentStep selectedProduct={selectedProduct} />
        )}
        {currentStep.id === 3 && <ConfirmationStep />}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleAction}
          disabled={contractLoading || isLoading || !contract}
        >
          {contractLoading || isLoading || !contract
            ? "Bitte warten..."
            : currentStep.action.cta}
        </Button>
      </CardFooter>
    </Card>
  );
}
