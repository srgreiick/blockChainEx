const SHA256 = require('crypto-js/sha256')

class Transaction{
  constructor(fromAddress, toAddress, amount){
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  calculateHash(){
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString;
  }

  signTransaction(signingKey){
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error("You can't sign transactions for other wallets!")
    }

    const hashTX = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex');

  }

  isValid(){
    if (this.fromAddress === null) return true;
  }
}

class Block{
    constructor(timeStamp, transactions, previousHash = ''){
        this.timeStamp = timeStamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timeStamp + JSON.stringify(this.data)+this.nonce).toString();
    }

    mineBlock(difficulty){
      while(this.hash.substring(0, difficulty)!== Array(difficulty+1).join("0")){
        this.nonce++;
        this.hash = this.calculateHash();
      }

      console.log("Block mined: "+this.hash);
    }
}


class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.mReward = 100;
    }

    createGenesisBlock(){
        return new Block("01/01/2021", "Genesis Block", "0" )
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    minePendingTransactions(miningRewardAddress){
      let block = new Block(Date.now(), this.pendingTransactions);
      block.mineBlock(this.difficulty);

      console.log("Block Mined!");
      this.chain.push(block);

      this.pendingTransactions = [
        new Transaction(null, miningRewardAddress, this.mReward)
      ];
    }

    createTransaction(transaction){
      this.pendingTransactions.push(transaction);
    }

    getAddressBalance(address){
      let balance = 0;

      for(const block of this.chain){
        for (const trans of block.transactions){
          if(trans.fromAddress === address){
            balance -= trans.amount;
          }

          if(trans.toAddress === address){
            balance += trans.amount;
          }
        }
      }
      return balance;
    }

    isChainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            return true;
        }
    }
}

module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;
