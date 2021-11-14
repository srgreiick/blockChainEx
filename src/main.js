const {BlockChain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate('f97a4648626ac5c5e5a36d7ef8b93cf710dbcbe7e1c3c5ae6da3480817a14e80');
const myWalletAddress = myKey.getPublic('hex');

let toxyCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, 'Public key here', 10);
tx1.signTransaction(myKey);
toxyCoin.addTransaction(tx1);



console.log('\n Starting the miner...');
toxyCoin.minePendingTransactions(myWalletAddress);

console.log('Balance of Anthrax is ', toxyCoin.getAddressBalance(myWalletAddress));

console.log('\n Starting the miner...');
toxyCoin.minePendingTransactions(myWalletAddress);

console.log('Balance of Anthrax is ', toxyCoin.getAddressBalance(myWalletAddress));
