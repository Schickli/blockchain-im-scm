"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminOrderStatus } from "@/lib/types/admin-order-status.type";
import { CheckCircle2, Circle, ArrowRight, Loader2 } from 'lucide-react';
import { StatusBadge } from "@/components/admin/status-badge";

interface UpdateStatusDialogProps {
  orderId: string;
  currentStatus: AdminOrderStatus;
  onUpdateStatus: (orderId: string, newStatus: AdminOrderStatus) => void;
}

const statusSteps = [
  AdminOrderStatus.Ordered,
  AdminOrderStatus.Producing,
  AdminOrderStatus.WaitingOnPayment,
  AdminOrderStatus.Shipping,
  AdminOrderStatus.Delivered,
  AdminOrderStatus.Cancelled,
];

export function ViewStatusDialog({
  orderId,
  currentStatus,
  onUpdateStatus,
}: UpdateStatusDialogProps) {
  const [status, setStatus] = useState<AdminOrderStatus>(currentStatus);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpdateStatus = async (newStatus: AdminOrderStatus) => {
    if (canProgressToStatus(newStatus)) {
      setIsLoading(true);
      
      if (newStatus === AdminOrderStatus.WaitingOnPayment) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setStatus(AdminOrderStatus.Shipping);
          onUpdateStatus(orderId, AdminOrderStatus.Shipping);
        }, 1500);
      } else {
        setStatus(newStatus);
        onUpdateStatus(orderId, newStatus);
      }
      
      setIsLoading(false);
    }
  };

  const canProgressToStatus = (newStatus: AdminOrderStatus): boolean => {
    const currentIndex = statusSteps.indexOf(status);
    const newIndex = statusSteps.indexOf(newStatus);
    
    if (newIndex <= currentIndex) return false; // Prevent going back
    if (newIndex - currentIndex > 1) return false; // Prevent skipping steps
    if (newStatus === AdminOrderStatus.Cancelled) return true; // Allow cancellation at any point
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Order Status Timeline</DialogTitle>
          <DialogDescription>
            Current progress for order #{orderId}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col space-y-4">
            {statusSteps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                  canProgressToStatus(step) ? 'cursor-pointer hover:bg-muted' : ''
                }`}
                onClick={() => canProgressToStatus(step) && handleUpdateStatus(step)}
                role="button"
                tabIndex={canProgressToStatus(step) ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    canProgressToStatus(step) && handleUpdateStatus(step);
                  }
                }}
              >
                <div className="w-8">
                  {status === step ? (
                    <CheckCircle2 className="text-primary w-6 h-6" />
                  ) : (
                    <Circle className={`w-6 h-6 ${index < statusSteps.indexOf(status) ? 'text-primary' : 'text-muted-foreground'}`} />
                  )}
                </div>
                <StatusBadge status={step} />
                <div className="flex-grow" />
                {index < statusSteps.length - 1 && status === step && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="ml-2">Processing...</span>
          </div>
        )}
        {showSuccess && (
          <div className="flex items-center justify-center text-green-600">
            <CheckCircle2 className="w-6 h-6 mr-2" />
            <span>Payment received! Proceeding to Shipping.</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

