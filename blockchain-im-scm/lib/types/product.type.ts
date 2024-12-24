export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export const products = [
  { id: 1, name: "Senkkopfschraube", price: 500000, quantity: 1 },
  { id: 2, name: "Sechskantschraube", price: 400000, quantity: 1 },
  { id: 3, name: "Flachkopfschraube", price: 100000, quantity: 1 },
] as Product[];
