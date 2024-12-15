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
          <li>Ein Backend, das Transaktionen auf der Blockchain ausführt und den Bestellstatus aktualisiert. Dafür werden intelligente Verträge eingesetzt.</li>
          <li>Die visuelle Oberfläche nutzt das Tailwind CSS-Framework und Komponenten aus der Shadcn-Bibliothek für ein modernes und benutzerfreundliches Design.</li>
        </ul>
        <p className="font-semibold mt-6">Der Ablauf sieht folgendermaßen aus:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Ein Autohersteller stellt eine Bestellung bei einem Zulieferer über das Frontend.</li>
          <li>Das Backend erstellt einen intelligenten Vertrag auf der Sepolia-Blockchain, der die Bestellung und deren Status verwaltet.</li>
          <li>Der Zulieferer kann den Bestellstatus über das Frontend einsehen und bei Zahlungseingang die Auslieferung auslösen.</li>
          <li>Der Sendungsstatus wird auf der Blockchain aktualisiert, sodass der Autohersteller den Fortschritt verfolgen kann.</li>
        </ol>
        <p className="mt-6">
          Durch die Verwendung der Blockchain-Technologie entsteht eine transparente und verlässliche Lieferkette, die für alle Beteiligten einsehbar ist. Das reduziert Reibungsverluste und erhöht die Effizienz des gesamten Prozesses.
        </p>
      </div>
    </div>
  </Card>
  )
}