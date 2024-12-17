import { Badge } from "@/components/ui/badge"
import { AdminOrderStatus } from "@/lib/types/admin-order-status.type"

interface StatusBadgeProps {
  status: AdminOrderStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variants = {
    [AdminOrderStatus.Ordered]: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    [AdminOrderStatus.Producing]: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    [AdminOrderStatus.WaitingOnPayment]: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    [AdminOrderStatus.Shipping]: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    [AdminOrderStatus.Delivered]: "bg-green-100 text-green-800 hover:bg-green-200",
    [AdminOrderStatus.Cancelled]: "bg-red-100 text-red-800 hover:bg-red-200",
  }

  const labels = {
    [AdminOrderStatus.Ordered]: "Ordered",
    [AdminOrderStatus.Producing]: "Producing",
    [AdminOrderStatus.WaitingOnPayment]: "Waiting on Payment",
    [AdminOrderStatus.Shipping]: "Shipping",
    [AdminOrderStatus.Delivered]: "Delivered",
    [AdminOrderStatus.Cancelled]: "Cancelled",
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {labels[status]}
    </Badge>
  )
}