import { Product } from "@/lib/types/product.type";

interface PaymentStepProps {
  selectedProduct: Product;
}

export default function PaymentStep({ selectedProduct }: PaymentStepProps) {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center gap-2 w-fit">
        <p className="text-lg font-medium">Kosten Total:</p>
        <p className="text-lg font-bold">
          ${selectedProduct.price * selectedProduct.quantity}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="text-lg font-medium">Produkt:</p>
        <p className="text-lg font-bold">{selectedProduct.name}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="text-lg font-medium">Contract ID:</p>
        <p className="text-lg font-bold">x02s4d12d34s45sdf23d24h1t23</p>
      </div>
    </div>
  );
}
