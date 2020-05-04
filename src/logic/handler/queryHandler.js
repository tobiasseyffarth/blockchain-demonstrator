export function getTransactions(blockchain) {
  const blocks = blockchain.getBlocks();
  let transactions = [];

  blocks.forEach(block => {
    transactions.push(block.transaction);
  });

  return transactions;
}

export function getAmountByAddress(blockchain, address) {
  let amount = 0;
  const transactions = getTransactions(blockchain);

  transactions.forEach(tx => {
    if (tx.source === address) {
      amount = amount - parseInt(tx.value);
      
    } else if (tx.target === address) {
      amount +=  parseInt(tx.value);
    }
  })

  return amount;
}

export function getTotalAmount(blockchain) {
  let amount = 0;
  const outgoingTransactions = getOutgoingTransactions(blockchain, 'genesis');

  outgoingTransactions.forEach(tx => {
    amount += parseInt(tx.value);
  })

  return amount;
}

export function getOutgoingTransactions(blockchain, address) {
  const transactions = getTransactions(blockchain);
  let outgoingTransactions = [];

  transactions.forEach(tx => {
    if (tx.source === address) {
      outgoingTransactions.push(tx);
    }
  })

  return outgoingTransactions;
}

export function getIncomingTransactions(blockchain, address) {
  const transactions = getTransactions(blockchain);
  let incomingTransactions = [];

  transactions.forEach(tx => {
    if (tx.target === address) {
      incomingTransactions.push(tx);
    }
  })

  return incomingTransactions;
}

export function getTransactionByAdress(blockchain, address) {
  const transactions = getTransactions(blockchain);
  return transactions.filter(item => item.source === address || item.target === address);
}

export function isValidAdress(blockchain, address) {
  const tx = getTransactionByAdress(blockchain, address);

  if (tx.length > 0) {
    return true;
  } else {
    return false;
  }
}

export function getAddresses(blockchain) {
  const transactions = getTransactions(blockchain);
  let addresses = [];

  transactions.forEach(tx => {
    let newAddress;

    newAddress = addresses.find(item => item === tx.source);
    if (newAddress === undefined) {
      addresses.push(tx.source);
    }

    newAddress = addresses.find(item => item === tx.target);
    if (newAddress === undefined) {
      addresses.push(tx.target);
    }
  })

  return addresses;
}