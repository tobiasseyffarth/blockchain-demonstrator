import { Block, Blockheader } from '../blockchain/block';
import { Transaction } from '../blockchain/transaction';
import * as Cryptohelper from '../../util/cryptoHelper';
import * as QueryHandler from './queryHandler';

export function createTransaction(source, target, value, signature) {
  const transaction = new Transaction(source, target, value, Date.now(), signature);
  return transaction;
}

export function isFunded(blockchain, address, value) {
  const amount = QueryHandler.getAmountByAddress(blockchain, address);

  if (amount >= value) {
    return true;
  } else {
    return false;
  }
}

export function createNewAccountTransaction(publickey, _value) {
  const value = _value || 10;
  const targetadress = Cryptohelper.getHash(publickey);
  return createTransaction('genesis', targetadress, value, 'null');
}

export function createBlock(blockchain, transaction) {
  // find nonce
  const latestBlock = blockchain.getLatestBlock();
  //console.log('latest block', latestBlock);

  const latestBlockHeader = latestBlock.blockheader;
  //console.log('latest block header', latestBlockHeader);
  
  const prevhash = Cryptohelper.getHash(JSON.stringify(latestBlockHeader));
  const hashMerkleRoot = Cryptohelper.getHash(JSON.stringify(transaction));

  const id = blockchain.getBlocks().length + 1;
  const blockheader = findNonce(id, prevhash, hashMerkleRoot);
  let block = new Block(blockheader, transaction);
  // console.log(block);
  return block;
}

function findNonce(id, prevhash, hashMerkleRoot) {
  let leadChar;
  const alphabet = '5'; //'abcdefghijklmnopqrstuvwxyz013456789';
  const no = 1;
  let done = false;
  let nonce;
  let blockheader;

  do {
    nonce = Math.random();
    blockheader = new Blockheader(id, nonce, prevhash, hashMerkleRoot);
    let hash = Cryptohelper.getHash(JSON.stringify(blockheader));
    leadChar = hash.slice(0, no);

    for (let i = 0; i < alphabet.length; i++) {
      const c = alphabet.charAt(i);
      if (leadChar === c) {
        done = true;
      }
    }
  } while (!done)

  return blockheader;
}

//final
export function createGenesisblock() {
  const transaction = new Transaction('genesis', 'genesis', 0, Date.now(), 'genesis');
  const hashMerkleRoot = Cryptohelper.getHash(JSON.stringify(transaction));
  const blockheader = findNonce('genesis','genesis',hashMerkleRoot);
  const genesisblock = new Block(blockheader, transaction);
  return genesisblock;
}