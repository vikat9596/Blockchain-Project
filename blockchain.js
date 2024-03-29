const Block = require("./Block");
const cryptoHash = require("./crypto-hash");

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock({data}){
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length-1],
            data
        })
        this.chain.push(newBlock);
    }

    replaceChain(chain){
        if(chain<= this.chain.length){
            console.log("The incoming chain is not longer");
            return;
        }
        if(!Blockchain.isValidchain(chain)){
            console.log("The incoming chain is not valid");
            return;
        }
        this.chain =chain;
    }

    static isValidchain(chain){
        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) {
            return false;
        }
        for(let i=1; i<chain.length;i++){
            const {timestamp, prevHash, hash,nonce,difficulty, data} = chain[i];
            const realLastHash =chain[i-1].hash;

            if(prevHash !== realLastHash) return false;
            
            const validatedHash = cryptoHash(timestamp,prevHash,nonce,difficulty,data);
            if(hash !== validatedHash) return false;
        }
        return true;
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({data:"Block 1"});

const result = Blockchain.isValidchain(blockchain.chain);

console.log(blockchain);

console.log(result);
// console.log(blockchain);

module.exports = Blockchain;
