import React, { useEffect, useState } from "react";
import {ethers} from 'ethers'
import { contractABI, contractAddress } from "./utils/constants";
import Navbar from "./Navbar";

export const TransactionContext = React.createContext();


const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI,signer);
    return transactionContract;
}


export const TransactionProvider = ({children}) =>{

    const[currentAccount, setCurrentAccount] = useState('');
    const[formData, setFormData] = useState({toAccount:'', amount:'',keyword:'',message:''});
    const[isLoading, setIsLoading] = useState(false);
    const[transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const[transactions, setTransactions] = useState([]);

    const handleOnchange =  (e) =>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value,
        }))

    }

    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
    
            const availableTransactions = await transactionsContract.getAllTransactions();
    
            const structuredTransactions = availableTransactions.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
    
            console.log(structuredTransactions);
    
            setTransactions(structuredTransactions);
          } else {
            console.log("Ethereum is not present");
          }
        } catch (error) {
          console.log(error);
        }
      };

    const checkIfWalletExists = async () =>{
        try{
            if(!window.ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({method:'eth_accounts'});
            if(accounts.length){
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            }else{
                console.log("No accounts");
            }

        }catch(error){
            console.log(error);
            throw new error("No Ethereum object");
        }
    }

    const connectWallet = async () =>{
        try{
            if(!window.ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method:'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log(error);
        }

    }

    const checkIfTransactionsExists = async () => {
        try {
          if (window.ethereum) {
            const transactionsContract = getEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();
    
            window.localStorage.setItem("transactionCount", currentTransactionCount);
          }
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

    useEffect(()=>{
        checkIfWalletExists();
        checkIfTransactionsExists();
    },[])


    const sendTransaction = async () => {
        try{
            if(!window.ethereum) return alert("please install metamask");
            const {toAccount, amount,keyword,message} = formData;
            const transactionContract = getEthereumContract();

            const parsedEth = ethers.utils.parseEther(amount);
            const transaction = await ethereum.request({
                method:'eth_sendTransaction',
                params:[{
                    from:currentAccount,
                    to:toAccount,
                    gas:'0x5208',
                    value:parsedEth._hex
                }]
            })


            const transactionHash = await transactionContract.addToBlockchain(toAccount,parsedEth,message,keyword);
            setIsLoading(true);
            console.log(`Loading--${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`success--${transactionHash.hash}`);
            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
            location.reload();


            
        }catch(error){
            console.log(error);
        }   
    }

    return(
        <TransactionContext.Provider value={{connectWallet,formData,currentAccount,sendTransaction,handleOnchange,isLoading,transactions}}>
            {children}
        </TransactionContext.Provider>
    )
}

