export class Blockheader {
  constructor(id, nonce, prevhash, hashMerkleRoot) {
    this.id = id;
    this.time = Date.now();
    this.nonce = nonce;
    this.prevhash = prevhash;
    this.hashMerkleRoot = hashMerkleRoot;
  }

  getId() {
    return this.id;
  }

  getTime() {
    return this.time;
  }

  getNonce() {
    return this.nonce;
  }

  getPrevhash() {
    return this.prevhash;
  }
}

export class Block {
  constructor(blockheader, transaction) {   
    this.blockheader = blockheader;
    this.transaction = transaction;
  }

  getBlockheader() {
    return this.blockheader;
  }

  getTransaction () {
    return this.transaction;
  }
}