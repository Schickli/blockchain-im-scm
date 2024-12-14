"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy, ExternalLink } from "lucide-react";

interface AccountInfoProps {
  account: string;
  chainId: string | undefined;
  disconnect: () => void;
}

export function AccountInfo({
  account,
  chainId,
  disconnect,
}: AccountInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainName = (id: string | undefined) => {
    let idNumber = 0;

    try {
      if (!id) return "Unknown Chain";
      idNumber = parseInt(id);
    } catch (e) {
      return "Unknown Chain";
    }

    const chains: { [key: number]: string } = {
      1: "Ethereum Mainnet",
      3: "Ropsten",
      4: "Rinkeby",
      5: "Goerli",
      42: "Kovan",
      11155111: "Sepolia",
    };
    return chains[idNumber] || `Chain ID: ${id}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-36">
          {formatAddress(account)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90 p-0" align="end">
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg">Account Info</h3>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Connected Account
            </p>
            <div className="flex items-center space-x-2">
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                {account}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => copyToClipboard(account)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              Connected Network
            </p>
            <p className="text-sm">{getChainName(chainId)}</p>
          </div>
        </div>
        <div className="border-t p-4 flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={disconnect}
            className="text-destructive"
          >
            Disconnect
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            asChild
          >
            <a
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Etherscan
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
