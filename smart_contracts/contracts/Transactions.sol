//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Transactions{
    struct TransactStruct{
        address sender;
        address reciver;
        uint256 amount;
        uint256 timestamp;
        string keyword;
        string message;
    }

    mapping(address => TransactStruct[])  transactions;
    mapping(address => uint256)  transactionCount;

    event transfer(address sender, address reciver, uint256 amount, uint256 timestamp, string keyword, string message);

    function addToBlockchain(address _reciver, uint256 _amount, string memory _keyword, string memory _message) public{
        transactions[msg.sender].push(TransactStruct(msg.sender, _reciver, _amount, block.timestamp, _keyword, _message));
        emit transfer(msg.sender, _reciver, _amount, block.timestamp, _keyword, _message);
        transactionCount[msg.sender]+=1;
    }

    function getTransactions(address _owner) public view returns(TransactStruct[] memory){
        return transactions[_owner];
    }

    function getTransactionCount(address _owner) public view returns(uint256){
        return transactionCount[_owner];
    }
}

