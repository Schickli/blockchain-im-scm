"use client";

import { useState } from "react";
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
import { CheckCircle2, Circle, Loader2, ArrowDown, X } from "lucide-react";
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
  const [loadingStep, setLoadingStep] = useState<AdminOrderStatus | null>(null);
  const [successStep, setSuccessStep] = useState<AdminOrderStatus | null>(null);

  const handleUpdateStatus = async (newStatus: AdminOrderStatus) => {
    if (!canProgressToStatus(newStatus)) return;

    if (newStatus === AdminOrderStatus.WaitingOnPayment) {
      await handleLoadingStep(newStatus, 1000);
    } else if (newStatus === AdminOrderStatus.Shipping) {
      await handleLoadingStep(newStatus, 1500);
    } else {
      setStatus(newStatus);
      onUpdateStatus(orderId, newStatus);
    }
  };

  const handleLoadingStep = async (
    step: AdminOrderStatus,
    delay: number,
  ) => {
    setLoadingStep(step);
    await new Promise((resolve) => setTimeout(resolve, delay));
    setLoadingStep(null);
    setSuccessStep(step);
    setStatus(step);
    onUpdateStatus(orderId, step);
  };

  const canProgressToStatus = (newStatus: AdminOrderStatus): boolean => {
    const currentIndex = statusSteps.indexOf(status);
    const newIndex = statusSteps.indexOf(newStatus);

    if (newStatus === AdminOrderStatus.Cancelled) return true; // Allow cancellation at any point
    if (newIndex <= currentIndex) return false; // Prevent going back
    if (newIndex - currentIndex > 1) return false; // Prevent skipping steps
    return true;
  };

  const renderStepIcon = (step: AdminOrderStatus, isActive: boolean) => {
    if (step === AdminOrderStatus.Cancelled && status === step) {
      return <X className="text-red-500 w-6 h-6" />;
    }
    if (loadingStep === step)
      return <Loader2 className="w-6 h-6 animate-spin" />;
    if (
      successStep === step ||
      (step === AdminOrderStatus.Delivered && status === step)
    )
      return <CheckCircle2 className="text-green-500 w-6 h-6" />;
    if (status === step)
      return <CheckCircle2 className="text-primary w-6 h-6" />;
    if (isActive) return <Circle className="text-primary w-6 h-6" />;
    return <Circle className="text-muted-foreground w-6 h-6" />;
  };

  const renderStepMessage = (step: AdminOrderStatus) => {
    if (loadingStep === step) {
      if (step === AdminOrderStatus.WaitingOnPayment)
        return "Waiting on Payment";
      if (step === AdminOrderStatus.Shipping) return "Waiting on Confirmation";
    }
    if (successStep === step) {
      if (step === AdminOrderStatus.WaitingOnPayment)
        return "Payment Successful";
      if (step === AdminOrderStatus.Shipping) return "Shipping Confirmed";
    }
    return null;
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
            {statusSteps.map((step, index) => {
              const isActive = canProgressToStatus(step);

              return (
                <div
                  key={step}
                  className={`flex items-center space-x-2 p-2 rounded-md transition-colors ${
                    isActive
                      ? "cursor-pointer hover:bg-muted border-slate-100 border-2"
                      : ""
                  }`}
                  onClick={() => isActive && handleUpdateStatus(step)}
                  role="button"
                >
                  <div className="w-8">{renderStepIcon(step, isActive)}</div>
                  <StatusBadge status={step} />
                  <div className="flex-grow" />
                  <p className="text-sm text-muted-foreground">
                    {renderStepMessage(step)}
                  </p>
                  {index < statusSteps.length - 2 && status === step && (
                    <ArrowDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
