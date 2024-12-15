import { Card } from "@/components/ui/card"

export function InfoPanel() {

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-8">
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2" />
    <div className="p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Prototyp: Blockchain-basierte Supply-Chain-Lösung
      </h1>
      <div className="space-y-4 text-gray-600 dark:text-gray-300">
        <p>
          Unser Prototyp nutzt die Sepolia-Testumgebung der Ethereum-Blockchain, um eine effiziente Supply-Chain-Lösung für einen Autohersteller zu demonstrieren. Die Kernelemente sind:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Ein Next.js-Frontend, das mit MetaMask-Integration entwickelt wurde. Benutzer können hier Bestellungen aufgeben und den Status verfolgen.</li>
          <li>Die erstellung eines Smart Contracts und veröffentlichen</li>
          <li>Ausführung von Transaktionen mit dem Smart Contract</li>

        </ul>
        <p className="font-semibold mt-6">Der Ablauf sieht folgendermaßen aus:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Ein Autohersteller stellt eine Bestellung bei einem Zulieferer über das Frontend.</li>
          <li>Dies wird im Vertag vermerkt.</li>
          <li>Der Zulieferer kann den Bestellstatus über den Adminbereich einsehen und bei Zahlungseingang die Auslieferung auslösen.</li>
          <li>Der Sendungsstatus wird auf der Blockchain aktualisiert, sodass der Autohersteller den Fortschritt verfolgen kann.</li>
        </ol>
      </div>
    </div>
  </Card>
  )
}