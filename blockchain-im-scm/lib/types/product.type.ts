export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export const products = [
  { id: 1, name: "Senkkopfschraube", price: 2.0, quantity: 1 },
  { id: 2, name: "Sechskantschraube", price: 1.0, quantity: 1 },
  { id: 3, name: "Flachkopfschraube", price: 4.0, quantity: 1 },
] as Product[];
