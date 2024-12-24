"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderTable } from "../../components/admin/order-table";
import NavBar from "@/components/nav-bar";
import { AdminOrderStatus } from "@/lib/types/admin-order-status.type";
import { Order } from "@/lib/types/admin-order.type";
import { products } from "@/lib/types/product.type";
import { useProduct } from "@/components/hooks/product.hook";

// Replace this with your actual data from the Smart Contract
const initialOrders: Order[] = [
  {
    id: "x02s4d12d34s45sdf23d24h1t23",
    product: products[0],
    status: AdminOrderStatus.Ordered,
    timestamp: new Date().toISOString(),
  },
];

export default function AdminDashboard() {
  const { orders } = useProduct();

  const handleUpdateStatus = (orderId: string, newStatus: AdminOrderStatus) => {
    
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0 p-8">
      <NavBar linkTo={"/"} ctaName={"User"} />
      <div className="mx-auto max-w-7xl">
        <Card className="w-full mb-8 rounded-lg overflow-hidden relative">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2" />
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
