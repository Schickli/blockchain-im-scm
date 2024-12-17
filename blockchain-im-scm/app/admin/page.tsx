"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderTable } from "../../components/admin/order-table";
import NavBar from "@/components/nav-bar";
import { AdminOrderStatus } from "@/lib/types/admin-order-status.type";
import { Order } from "@/lib/types/admin-order.type";

// Replace this with your actual data from the Smart Contract
const initialOrders: Order[] = [
  {
    id: "x02s4d12d34s45sdf23d24h1t23",
    productId: "SCREW001",
    productName: "Senkkopfschraube",
    status: AdminOrderStatus.Ordered,
    timestamp: new Date().toISOString(),
    cost: 2,
  },
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState(initialOrders);

  const handleUpdateStatus = (
    orderId: string,
    newStatus: AdminOrderStatus
  ) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, timestamp: new Date().toISOString() }
          : order
      )
    );
  };

  const counts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 pt-0 p-8">
      <NavBar linkTo={"/"} ctaName={"User"} />
      <div className="mx-auto max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
