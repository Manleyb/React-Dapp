import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import all-pages from './all-pages.js'
import singlePage from './singlePage.js'





const greeterAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"


function App() {
  const [greeting, setGreetingValue] = useState()

  async function requestAccount(){
    await window.ethereum.request({method: 'eth_requestAccounts' });
    //request account information from metamask walett



  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      //check for metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet()
        console.log('the beans:',data)
      }catch (err){ 
        console.log('error',err)
      }
      
    }
  
  }

  async function setGreeting() {
    if (!greeting) return
    if (typeof window.ethereum !== 'undefined') {
      //check for metamask
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(greeting)
      await transaction.wait()
      fetchGreeting()

    }
  }
  return (
     //add a document to the page 


    <div className="App">
      <header className="App-header">
       
 

      <button onClick={fetchGreeting}>Fetch Greeting</button>
       <button onClick={setGreeting}>Set Greetingn hi what is up </button>
       <input 
         onChange={(e) => setGreetingValue(e.target.value)}
         placeholder="set greeting this is a test"
         value = {greeting}
        />
         
      </header>
    </div>
  );
}

export default App;
//27