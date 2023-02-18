import { useState, useEffect } from 'react';
import Web3 from 'web3';
import MyNFTContract from '../build/contracts/WorkerNFTContract.json';

function MintNFTButton() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function connectToWeb3() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MyNFTContract.networks[networkId];
      const contract = new web3.eth.Contract(
        MyNFTContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      setWeb3(web3);
      setAccount(accounts[0]);
      setContract(contract);
    }

    connectToWeb3();
  }, []);

  async function handleMintNFT() {
    // Call the smart contract's mint function
    await contract.methods.mintNFT(account, 'My NFT', 'https://metadata.com/my-nft').send({ from: account });
  }

  return (
    <button className="text-white font-bold rounded-full bg-blue-500 text-white px-4 py-4 mx-4" onClick={handleMintNFT}>Mint Worker ID NFT</button>
  );
}