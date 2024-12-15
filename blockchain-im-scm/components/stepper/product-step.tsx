import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSelectorProps {
  selectedProduct: Product;
  setSelectProduct: (product: Product) => void;
  products: Product[];
}

export default function ProductStep({
  selectedProduct,
  setSelectProduct,
  products,
}: ProductSelectorProps) {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedProduct) return;
    const newQuantity = parseInt(e.target.value, 10);
    selectedProduct.quantity = newQuantity;
    setSelectProduct({ ...selectedProduct });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="product-select"
          className="text-sm font-medium text-muted-foreground"
        >
          Wähle ein Produkt
        </label>
        <Select
          value={selectedProduct.id.toString()}
          onValueChange={(value) => {
            const selected = products.find((e) => e.id == parseInt(value));
            if (selected) {
              setSelectProduct(selected);
            }
          }}
        >
          <SelectTrigger id="product-select">
            <SelectValue placeholder="Wähle ein Produkt" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name} - ${product.price.toFixed(2)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <label
          htmlFor="quantity"
          className="text-sm font-medium text-muted-foreground mr-2"
        >
          Menge
        </label>
        <input
          type="number"
          id="quantity"
          value={selectedProduct?.quantity}
          onChange={handleQuantityChange}
          className="border rounded p-1"
          min="1"
          disabled={!selectedProduct}
        />
      </div>
    </div>
  );
}
