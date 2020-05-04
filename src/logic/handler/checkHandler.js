import * as Cryptohelper from '../../util/cryptoHelper';
 

// todo: https://github.com/ethereum/wiki/wiki/White-Paper

function isValid(prevblock, block) {
  const calcPrevhash = Cryptohelper.getHash(JSON.stringify(prevblock.blockheader));
  const getPrevHash = block.blockheader.prevhash;
  const hash = Cryptohelper.getHash(JSON.stringify(block.blockheader));

  /*
  console.log(calcPrevhash);
  console.log(getPrevHash);

  console.log('hash current block');
  console.log(hash);
  */

  if (calcPrevhash === getPrevHash) {
    return true;
  } else {
    return false;
  }
}

export function checkBlock(blockchain, checkBlock) {
  const blocklist = blockchain.getBlocks();

  for (let i = 1; i < blocklist.length; i++) {
    const block = blocklist[i];
    const prevBlock = blocklist[i - 1];

    if(!isValid(prevBlock, block)){
      return block;
    }
    if (checkBlock === block) {
      break;
    }
  }
  return true;
}

export function checkBlockchain(blockchain) {
  return checkBlock(blockchain, blockchain.getLatestBlock());
}