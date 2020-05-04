import { Crypt, RSA } from 'hybrid-crypto-js'; // https://www.npmjs.com/package/hybrid-crypto-js
import sha256 from 'js-sha256'; // https://www.npmjs.com/package/js-sha256

export function getHash(input) {
  let hash = sha256.create();
  hash.update(input);
  return hash.hex();
}

export function createKeyPair(_keysize) {
  const keySize = _keysize || 4096;
  const entropy = Math.random;
  const rsa = new RSA({
    entropy: entropy,
    keySize: keySize
  });

  return new Promise((resolve) => {
    rsa.generateKeyPair((keyPair) => {
      resolve(keyPair);
    })
  })
};

export function encrypt(key, message) {
  const entropy = Math.random;
  const crypt = new Crypt({ entropy: entropy });
  const encrypted = crypt.encrypt(key, message);

  return encrypted;
}

export function decrypt(encrypted, key) {
  const entropy = Math.random;
  const crypt = new Crypt({ entropy: entropy });
  const decrypted = crypt.decrypt(key, encrypted);

  return decrypted.message;
}