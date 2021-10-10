const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timeStamp, data, previousHash = ''){
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timeStamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2021", "Genesis Block", "0" )
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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


let toxyCoin = new BlockChain();
toxyCoin.addBlock(new Block(1, "05/03/2021", {ammount: 4}))
toxyCoin.addBlock(new Block(2, "06/03/2021", {ammount: 50}))

//console.log(JSON.stringify(toxyCoin, null, 4));
console.log("Valid? "+toxyCoin.isChainValid());

toxyCoin.chain[1].data = {ammount:300}
toxyCoin.chain[1].calculateHash()

console.log("Valid? "+toxyCoin.isChainValid());
