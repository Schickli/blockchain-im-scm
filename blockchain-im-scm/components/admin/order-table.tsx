"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "./status-badge"
import { ViewStatusDialog } from "./update-status-dialog"
import { AdminOrderStatus } from "@/lib/types/admin-order-status.type"
import { Order } from "@/lib/types/admin-order.type"

interface OrderTableProps {
  orders: Order[]
  onUpdateStatus: (orderId: string, newStatus: AdminOrderStatus) => void
}

export function OrderTable({ orders, onUpdateStatus }: OrderTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono">{order.id}</TableCell>
            <TableCell>{order.productName}</TableCell>
            <TableCell>
              <StatusBadge status={order.status} />
            </TableCell>
            <TableCell>{order.timestamp}</TableCell>
            <TableCell>${order.cost}</TableCell>
            <TableCell>
              <ViewStatusDialog
                orderId={order.id}
                currentStatus={order.status}
                onUpdateStatus={onUpdateStatus}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

