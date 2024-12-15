async function main() {
  // Ignore type error
  const HelloWorld = await ethers.getContractFactory("HelloWorld");

  // Deploy den Contract mit den Constructor-Argumenten
  const helloWorld = await HelloWorld.deploy("Hello World!");

  // Warte, bis der Deployment-Vorgang abgeschlossen ist
  await helloWorld.deployed();

  // Zeige die Adresse des Deployments
  console.log("Contract deployed to address:", helloWorld.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
