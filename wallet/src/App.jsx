import { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import Account from "./Component/Account";
import SendEther from "./Component/SendEther";

function App() {
  const [web3, setWeb3] = useState(null);

  /*Passing prop from parent to child(Account.jsx)*/
  const [account, setAccount] = useState(null);

  const[receipt,setReceipt] = useState({});
  const[toggle,setToggle] = useState(false);

  function setAddress(address) {
    setAccount(address);
  }

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3("HTTP://127.0.0.1:7545");
        setWeb3(web3);
        // console.log(web3);
      } catch (error) {
        alert("Failed to connect with web3");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <>
    <div className="container">
      <div className="firstContainer">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <h1 className="opacity">👋 Welcome to YourWallet</h1>
          <Account web3={web3} setAddress={setAddress} />
          <SendEther web3={web3} account={account} setReceipt={setReceipt} setToggle={setToggle}/>
        </div>
        <div className="circle circle-two"></div>
      </div>
    </div>
    <div className="secondContainer">
     <div className="json">
       <h3>(Json Response)</h3>
       <div className='code'>
         {toggle && JSON.stringify(
             receipt,
             ["transactionHash","blockHash","blockNumber","gasUsed"],
             2  
         )}
       </div>
     </div>
   </div>
   </>
  );
}

export default App;
