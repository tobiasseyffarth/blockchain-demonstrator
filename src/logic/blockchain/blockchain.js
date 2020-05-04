class BlockchainModel {
  constructor() {
    this.name = 'mychain';
    this.blocks = [];
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getBlocks() {
    return this.blocks;
  }

  setBlocks(blocks) {
    this.blocks = blocks;
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  getLatestBlock() {
    return this.blocks[this.blocks.length - 1];
  }

}

const Blockchain = new BlockchainModel();

module.exports = Blockchain;