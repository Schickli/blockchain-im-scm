async function main() {
    // Ignore type error
    const Orders = await ethers.getContractFactory("OrderManagement");
  
    const orders = await Orders.deploy();
  
    await orders.deployed();
  
    console.log("Contract deployed to address:", orders.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error deploying contract:", error);
      process.exit(1);
    });
  