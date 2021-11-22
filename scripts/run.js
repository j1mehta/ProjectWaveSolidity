const main = async () => {

    //We need a wallet address to deploy this contract.
    //A Signer in ethers is an abstraction of an Ethereum Account, 
    //which can be used to sign messages and transactions and send 
    //signed transactions to the Ethereum Network to execute state 
    //changing operations.
    //Although hardhat provides the address in the background, we 
    //still fetch it here manually
    const [owner, randomPerson] = await hre.ethers.getSigners();
    
    //Compile our contract and generate the necessary files we need 
    //to work with our contract under the artifacts directory.
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');

    //Hardhat will create a local Ethereum network for us, but just for this contract. 
    //Then, after the script completes it'll destroy that local network. So, every time
    //you run the contract, it'll be a fresh blockchain. What's the point? It's kinda 
    //like refreshing your local server every time so you always start from a clean slate 
    //which makes it easy to debug errors.
    const waveContract = await waveContractFactory.deploy();

    //We'll wait until our contract is officially deployed 
    //to our local blockchain
    await waveContract.deployed();
  
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();
  
    //Returns a new instance of the Contract but connected to
    // the Signer (randomPerson). 
    waveTxn = await waveContract.connect(randomPerson).wave();

    //Resolves to the TransactionReceipt once the transaction has
    //been included in the chain for confirms blocks. If confirms
    //is 0, and the transaction has not been mined, null is returned.
    await waveTxn.wait();
    console.log('RandomPerson waved: ' + randomPerson.address);
    waveCount = await waveContract.getTotalWaves();
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  

  //When we run this script through npx hardhat run scripts/run.js
  //we actually 
  //1. Creating a new local Ethereum network.
  //2. Deploying your contract.
  //3. Then, when the script ends Hardhat will automatically destroy that local network.
  // `npx hardhat node` will start a local eth network that *stays alive*
  runMain();