import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TransactionContext } from './TransactionContext'
import Transactions from './Transactions'
import Navbar from './Navbar'
import ethLogo from './ethereum-2458552_640.webp'
import Loading from './Loading'
function App() {


  const {connectWallet, formData,currentAccount,sendTransaction,handleOnchange,isLoading} = React.useContext(TransactionContext);


  const saveChanges = () =>{
    const {toAccount, amount,keyword,message} = formData;

    sendTransaction();
    
  }

  return (
    <div className='maincontent-div'>
      <Navbar/>
      <div className='main-div'>
        <div>
        <div className='eth-card'>
          <img src={ethLogo} alt="ethereum logo" className='eth-logo'/>
          <p>{currentAccount?`Wallet Address: ${currentAccount.slice(0,5)}....${currentAccount.slice(36)}`:`Wallet Address`}</p>
          <h2>Ethereum</h2>
</div>
{
  !currentAccount ? <button onClick={connectWallet} className='cw-btn'>Connect Wallet</button>:<p></p>
}

        </div>
      
      <div className='form-div'>
      <input placeholder='To address' type="text" name="toAccount" onChange={handleOnchange} className='form'/>
      <input placeholder='amount' type='number' name='amount' step='0.0001' onChange={handleOnchange} className='form'/>
      <input placeholder='keyWord' type="text" name='keyword' onChange={handleOnchange} className='form'/>
      <input placeholder='Message' type="text" name='message' onChange={handleOnchange} className='form'/>
      {
       isLoading?<Loading/>:<button type='button' onClick={saveChanges} className='submit-btn'>Submit</button>
      }
      
    
    
      </div>
      </div>
  <Transactions/>
    </div>
  )
}

export default App
