"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderTable } from "../../components/admin/order-table";
import NavBar from "@/components/nav-bar";
import { AdminOrderStatus } from "@/lib/types/admin-order-status.type";
import { Order } from "@/lib/types/admin-order.type";
import { Product } from "@/lib/types/product.type";
import { useContract } from "@/components/hooks/contract.hook";

export default function AdminDashboard() {
  const { contract, loading: contractLoading, error } = useContract();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const onUpdateStatus = async (orderId: string, status: AdminOrderStatus) => {

  }

  const parseOrders = (rawOrders: any[]): Order[] => {
    return rawOrders.map((rawOrder: any) => {
      const [
        rawId,
        rawProduct,
        rawStatus,
        rawTimestamp
      ] = rawOrder;

      const product: Product = {
        id: rawProduct[0].toString(),
        name: rawProduct[1],
        price: Number(rawProduct[2]), 
        quantity: Number(rawProduct[3]) 
      };

      const order: Order = {
        id: rawId,
        product,
        status: parseStatus(rawStatus), 
        timestamp: new Date(Number(rawTimestamp) * 1000).toISOString()
      };

      return order;
    });
  };

  const parseStatus = (rawStatus: any): AdminOrderStatus => {
    switch (Number(rawStatus)) {
      case 0:
        return AdminOrderStatus.Ordered;
      case 1:
        return AdminOrderStatus.Producing;
      case 2:
        return AdminOrderStatus.WaitingOnPayment;
      case 3:
        return AdminOrderStatus.Shipping;
      case 4:
        return AdminOrderStatus.Delivered;
      case 5:
        return AdminOrderStatus.Cancelled;
      default:
        throw new Error(`Unknown status code: ${rawStatus}`);
    }
  };

  const getAllOrders = useCallback(async () => {
    if (!contract) return;

    setLoading(true);
    try {
      const rawOrders: any[] = await contract.getAllOrders();
      const parsedOrders = parseOrders(rawOrders).reverse();
      setOrders(parsedOrders);
      console.log("Fetched and parsed orders:", parsedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    if (contract) {
      getAllOrders();
    }
  }, [contract, getAllOrders]);

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
            <OrderTable orders={orders} loading={loading} onUpdateStatus={onUpdateStatus}/>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}