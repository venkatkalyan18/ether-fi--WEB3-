
import React,{useContext} from "react";
import { TransactionContext } from "./TransactionContext";
import dummyData from "./utils/dummyData.js";

const Transactions = () => {

  
    const {currentAccount,transactions} = React.useContext(TransactionContext);
    return(
        <div className="transaction-div">
        {currentAccount ? (<h1 className="tx">Latest transactions</h1>):(<h1 className="txs">Connect wallet to see latest Transactions</h1>)}
        
            <div className="it-div">
          {transactions.map((transac, i) => (
          <div className="itc-div" key={i}>

            <a href={`https://sepolia.etherscan.io/address/${transac.addressFrom}`} target="_blank">
                <p>from:${transac.addressFrom}</p>
            </a>
            <a href={`https://sepolia.etherscan.io/address/${transac.addressTo}`} target="_blank">
                <p>to:${transac.addressTo}</p>
            </a>
            <p>Amount: {transac.amount} ETH</p>
            {transac.message && (
            <>
              <p >Message: {transac.message}</p>
            </>

          )}
            <p className="text-[#37c7da] font-bold">{transac.timestamp}</p>
          </div>
          ))}
        </div>
        

        </div>
    )
}

export default Transactions;