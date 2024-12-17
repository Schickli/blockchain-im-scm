import { Product } from './product.type';
import { AdminOrderStatus } from "./admin-order-status.type"

export type Order = {
  id: string
  product: Product
  status: AdminOrderStatus
  timestamp: string
}