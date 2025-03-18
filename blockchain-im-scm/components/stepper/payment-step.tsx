import { Product } from "@/lib/types/product.type";
import { useContract } from "../hooks/contract.hook";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
// import { useOrderContext } from "../provider/order.provider";

interface PaymentStepProps {
  selectedProduct: Product;
}

export default function PaymentStep({ selectedProduct }: PaymentStepProps) {
  const { CONTRACT_ADDRESS } = useContract();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 w-fit">
        <p className="font-medium">Kosten Total:</p>
        <p className="font-bold">
          {selectedProduct.price * selectedProduct.quantity} Wei
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="font-medium">Produkt:</p>
        <p className="font-bold">{selectedProduct.name}</p>
      </div>
      {/* <div className="flex items-center gap-2 mt-4">
        <p className="font-medium">Bestell ID:</p>
        <p className="font-bold">{currentOrderId}</p>
      </div> */}
      <div className="flex items-center gap-2 mt-4">
        <p className="font-medium">Contract Address</p>
        <p className="font-bold">{CONTRACT_ADDRESS}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          className="text-muted-foreground"
          asChild
        >
          <a
            href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
