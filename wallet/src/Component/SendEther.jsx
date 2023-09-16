import React, { useState } from 'react'

function SendEther({web3,account,setReceipt,setToggle}) {

    const sendEther =(event)=>{
        event.preventDefault();
        const _to = document.querySelector("#to").value;
        const _value = document.querySelector("#value").value;
        const weiValue = web3.utils.toWei(_value,"ether");
        web3.eth.sendTransaction({from: account, to: _to, value: weiValue}).then( (receipt) => {setReceipt(receipt); setToggle(true)} );
        // console.log(receipt);
    }

  return (
    <>
      <form className="box" onSubmit={sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </>
  )
}

export default SendEther
