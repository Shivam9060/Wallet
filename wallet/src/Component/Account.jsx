import React, { useEffect, useState } from 'react'

function Account({web3,setAddress}) {

    const[provider,setProvider] = useState("None");
    const[balance,setBalance] = useState(null);
    const[account,setAccount]  = useState(null);

    useEffect(()=>{
        const allAccounts = async()=>{
            try{
                const select = document.getElementById("selectNumber");
                const options = await web3.eth.getAccounts();
                setProvider("Ganache");
                for(let i=0;i<options.length;i++){
                    var opt= options[i];
                    var element = document.createElement("option");
                    element.value=opt;
                    element.textContent=opt;
                    select.appendChild(element);
                }
            }
            catch(error){
                setProvider("Not Connected");
            }
        }
        web3 && allAccounts();
    },[web3])

    const selectAccount = async ()=>{
        const selectedAccount = document.querySelector("#selectNumber").value;
        if(selectedAccount && selectedAccount!== "Select an Account"){
            setAddress(selectedAccount);
            const accountBalance = await web3.eth.getBalance(selectedAccount);
            const etherBalance = web3.utils.fromWei(accountBalance,"ether");
            setBalance(etherBalance);
            setAccount(selectedAccount);
        }
    }

  return (
    <>
    <form id='myForm'>
        <label htmlFor="selectNumber" >Select an Accounts:</label>
        <select className='innerBox' id="selectNumber" onChange={selectAccount}>
            <option></option>
        </select>
    </form>  
    <div className="details">
        <span className="connected">Account: {account}</span>
        <br />
        <span className='balance'>Account Balance : {balance} ether</span>
        <br />
        <span className='provider'>Provider : {provider} </span>
    </div>
    </>
  )
}

export default Account
