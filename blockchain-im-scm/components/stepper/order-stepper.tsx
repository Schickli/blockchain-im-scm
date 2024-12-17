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
import { Product } from "@/lib/types/product.type";
import { Step } from "@/lib/types/step.type";
import { products } from "@/lib/types/product.type";

const order = async (product: Product) => {
  console.log("Ordering product", product);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return true;
};

const pay = async (product: Product) => {
  console.log("Pay", product);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return true;
};

const received = async (product: Product) => {
  console.log("Received", product);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return true;
};

const steps = [
  {
    id: 1,
    title: "Bestellung aufgeben",
    icon: ShoppingCart,
    action: {
      cta: "Bestellen",
      action: order,
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
      action: pay,
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
      action: received,
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

export default function OrderStepper() {
  const [currentStep, setCurrentStep] = useState<Step>(steps[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    const result = await currentStep.action.action(selectedProduct);
    setIsLoading(false);

    if (result) {
      setIsSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(false);
    }

    if (result && currentStep.id < steps.length) {
      setCurrentStep(steps[currentStep.id]);
    } else {
      setCurrentStep(steps[0]);
    }
  };

  return (
    <Card className="w-full mb-8 rounded-lg overflow-hidden relative">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2" />
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Order Process</CardTitle>
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
        <Button onClick={handleAction}>{currentStep.action.cta}</Button>
      </CardFooter>
    </Card>
  );
}
