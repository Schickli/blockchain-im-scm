import { Card } from "@/components/ui/card";

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
            <li>Ein Next.js-Frontend mit MetaMask-Integration, das Benutzern ermöglicht, Bestellungen aufzugeben und den Status zu verfolgen.</li>
            <li>Die Erstellung und Bereitstellung eines Smart Contracts.</li>
            <li>Die Ausführung von Transaktionen mit dem Smart Contract.</li>
          </ul>
          <p className="font-semibold mt-6">Der Ablauf sieht folgenderma&szlig;en aus:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Ein Autohersteller stellt eine Bestellung bei einem Zulieferer über das Frontend.</li>
            <li>Dies wird im Vertrag vermerkt.</li>
            <li>Der Zulieferer kann den Bestellstatus im Adminbereich einsehen und bei Zahlungseingang die Auslieferung auslösen.</li>
            <li>Der Sendungsstatus wird auf der Blockchain aktualisiert, sodass der Autohersteller den Fortschritt verfolgen kann.</li>
          </ol>
          <p className="font-semibold mt-6">Nutzung:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Erstellen Sie eine MetaMask-Wallet (am besten mit der MetaMask-Browser-Erweiterung).</li>
            <li>Klicken Sie auf &quot;Connect Wallet&quot;.</li>
            <li>Scannen Sie den QR-Code oder nutzen Sie die MetaMask-Browser-Erweiterung.</li>
            <li>Nun wird angezeigt, dass die Wallet verbunden ist. Stellen Sie sicher, dass Ihre Wallet auf das &quot;Sepolia&quot;-Netzwerk eingestellt ist.</li>
            <li>Jetzt kann eine Bestellung aufgegeben werden. In MetaMask sollten Sie aufgefordert werden, die Transaktion zu bestätigen.</li>
            <li>Im &quot;Admin&quot;-Panel kann die Bestellung eingesehen werden. Die Bestellungen werden vom Smart Contract abgerufen.</li>
            <li>Alle Transaktionen können mit &quot;Etherscan&quot; unter der Account-Info überprüft werden (geöffnet durch Klicken auf die Adresse neben &quot;Admin&quot;).</li>
            <li>Die weiteren Schritte wurden noch nicht implementiert.</li>
          </ol>
        </div>
      </div>
    </Card>
  );
}