const {BlockChain, Transaction} = require("./blockchain");

let toxyCoin = new BlockChain();

toxyCoin.createTransaction(new Transaction('addr1', 'addr2', 100));
toxyCoin.createTransaction(new Transaction('addr2', 'addr1', 50));

console.log('\n Starting the miner...');
toxyCoin.minePendingTransactions('Anthrax-addr');

console.log('Balance of Anthrax is ', toxyCoin.getAddressBalance('Anthrax-addr'));

console.log('\n Starting the miner...');
toxyCoin.minePendingTransactions('Anthrax-addr');

console.log('Balance of Anthrax is ', toxyCoin.getAddressBalance('Anthrax-addr'));

console.log('\n Starting the miner...');
toxyCoin.minePendingTransactions('Anthrax-addr');

console.log('Balance of Anthrax is ', toxyCoin.getAddressBalance('Anthrax-addr'));

console.log('\n Starting the miner...');
toxyCoin.minePendingTransactions('Anthrax-addr');

console.log('Balance of Anthrax is ', toxyCoin.getAddressBalance('Anthrax-addr'));
