import crypto from 'crypto'
import CryptoJS from 'crypto-js'
import { compressUuid } from './string.util'
import pkg from 'scrypt-js';
const { syncScrypt } = pkg;
import { keccak256 } from 'ethers';
import argon2 from 'argon2';

/**
 * use crypto.randomBytes to generate random string
 * @param length
 * @returns
 */
export function genRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

/**
 * Get random index based on probability array
 * @since 1.0.0
 * @param prob_array probability array
 */
export function randomWithProb(prob_array: number[]): number {
  let total = 0
  for (let _d of prob_array) {
    total += _d
  }
  prob_array = prob_array.map(o => o / total)
  // Get random number
  let r = Math.random()
  // Process the probability array
  let s = prob_array
    .map((v, index) => {
      return { index: index, prob: v }
    })
    .sort((a, b) => a.prob - b.prob)
  // Determine random position
  let result = s.find(v => (r -= v.prob) <= 0)
  return result ? result.index : s.length - 1
}

export function uuid() {
  return crypto.randomUUID()
}

export function shortUuid() {
  let uid = uuid()
  return compressUuid(uid)
}

export function hmac(input: string, key: string, out: 'base64' | 'base64url' | 'hex' | 'binary') {
  return out
    ? crypto.createHmac('sha1', key).update(input).digest(out)
    : crypto.createHmac('sha1', key).update(input).digest('hex')
}

export function md5(str: string) {
  const md5sum = crypto.createHash('md5')
  md5sum.update(str)
  str = md5sum.digest('hex')
  return str
}

export function sha1(str: string) {
  const md5sum = crypto.createHash('sha1')
  md5sum.update(str)
  str = md5sum.digest('hex')
  return str
}

export function sha512(password: string, salt: string) {
  let hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  let value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value,
  }
}

export function sha3_256(str: string) {
  let hash = crypto.createHash('sha3-256')
  hash.update(str)
  return hash.digest('hex')
}

export function hmacSha256(str: string, key: any) {
  const md5sum = crypto.createHmac('sha256', key)
  md5sum.update(str)
  const data = md5sum.digest('hex')
  console.log(`HmacSHA256 rawContent is [${str}], key is [${key}], hash result is [${data}]`)
  return data
}

export const aesEncrypt = (plaintText: string, key) => {
  key = CryptoJS.SHA1(key).toString().substring(0, 16)
  key = CryptoJS.enc.Base64.parse(key)
  let encryptedData = CryptoJS.AES.encrypt(plaintText, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })

  return encryptedData.toString(CryptoJS.format.Hex)
}

export const aesDecrypt = (encryptedDataHexStr, key) => {
  key = CryptoJS.SHA1(key).toString().substring(0, 16)
  key = CryptoJS.enc.Base64.parse(key)
  let encryptedHex = CryptoJS.enc.Hex.parse(encryptedDataHexStr)
  let encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex)

  var decryptedData = CryptoJS.AES.decrypt(encryptedBase64, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })

  return decryptedData.toString(CryptoJS.enc.Utf8)
}

export function createSign(secretKey: string, paramStr: string, timestamp: number) {
  paramStr = `${paramStr}:${timestamp}:${secretKey}`
  return sha1(paramStr)
}

export function checkSign({
  secretKey,
  data,
  sign,
  signKeys,
}: {
  secretKey: string
  data: {}
  sign: string
  signKeys: string[]
}) {
  signKeys.sort()
  let signStr = ''
  for (let key of signKeys) {
    if (signStr.length > 0) {
      signStr += '&'
    }
    signStr += `${key}=${data[key]}`
  }
  console.log(signStr)
  let sign1 = hmacSha256(signStr, secretKey)
  return sign1 === sign
}


/**
 * Get password input from the user
 * @returns {Promise<string>} The entered password
 */
export const getPasswordInput = () => {
  return new Promise((resolve) => {
    process.stdout.write('Please enter password: ')
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    
    let password = ''

    process.stdin.on('data', (key: string) => {
      if (key === '\r' || key === '\n') {
        // Enter key pressed
        process.stdin.setRawMode(false)
        process.stdin.pause()
        process.stdout.write('\n')
        resolve(password)
      } else if (key === '\u0003') {
        // Ctrl+C pressed
        process.exit(1)
      } else if (key === '\u007f' || key === '\b') {
        // Backspace pressed
        if (password.length > 0) {
          password = password.slice(0, -1)
          // Don't show any visual feedback for backspace
        }
      } else {
        // Regular character
        password += key
        // Don't show any characters (completely silent input like shell password)
      }
    })
  })
}

const decrypt = async function (v3Keystore: any, password: string, nonStrict?: boolean) {
  var json = (!!v3Keystore && typeof v3Keystore === 'object') ? v3Keystore : JSON.parse(nonStrict ? v3Keystore.toLowerCase() : v3Keystore);
  const cryptoObj = json.crypto || json;
  const kdfparams = cryptoObj.kdfparams;
  let derivedKey;
  if (cryptoObj.kdf === 'scrypt') {
    derivedKey = syncScrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
  } else if (cryptoObj.kdf === 'argon2') {
    try {
      derivedKey = await argon2.hash(password, {
        salt: Buffer.from(kdfparams.salt, 'hex'),
        hashLength: kdfparams.dklen,
        timeCost: kdfparams.t,
        memoryCost: kdfparams.m,
        parallelism: kdfparams.p,
        type: argon2.argon2id,
        raw: true
      });
    } catch (error) {
      throw new Error('Argon2 key derivation failed: ' + error.message);
    }
  }
  var ciphertext = Buffer.from(cryptoObj.ciphertext, 'hex');
  var mac = keccak256(Uint8Array.from(Buffer.from([...derivedKey.slice(16, 32), ...ciphertext]))).replace('0x', '');
  if (mac !== cryptoObj.mac) {
      throw new Error('Key derivation failed - possibly wrong password');
  }
  var decipher = crypto.createDecipheriv(cryptoObj.cipher, derivedKey.slice(0, 16), Uint8Array.from(Buffer.from(cryptoObj.cipherparams.iv, 'hex')));
  var seed = '0x' + Buffer.from([...decipher.update(Uint8Array.from(ciphertext)), ...decipher.final()]).toString('hex');
  return seed;
}

const encrypt = async function (privateKey: string, password: string, options?: any) {
  options = options || {};
  var salt = options.salt || crypto.randomBytes(32);
  var iv = options.iv || crypto.randomBytes(16);
  var derivedKey;
  var kdf = options.kdf || 'scrypt';
  var kdfparams: any = {
      dklen: options.dklen || 32,
      salt: salt.toString('hex')
  };
  if (kdf === 'scrypt') {
    kdfparams.n = options.n || 8192; // 2048 4096 8192 16384
    kdfparams.r = options.r || 8;
    kdfparams.p = options.p || 1;
    derivedKey = syncScrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
  } else if (kdf === 'argon2') {
    kdfparams.t = options.t || 3; // time cost (iterations)
    kdfparams.m = options.m || 4096; // memory cost in KB
    kdfparams.p = options.p || 1; // parallelism
    try {
      derivedKey = await argon2.hash(password, {
        salt: Buffer.from(kdfparams.salt, 'hex'),
        hashLength: kdfparams.dklen,
        timeCost: kdfparams.t,
        memoryCost: kdfparams.m,
        parallelism: kdfparams.p,
        type: argon2.argon2id,
        raw: true
      });
    } catch (error) {
      throw new Error('Argon2 key derivation failed: ' + error.message);
    }
  }
  var cipher = crypto.createCipheriv(options.cipher || 'aes-128-ctr', derivedKey.slice(0, 16), Uint8Array.from(iv));
  if (!cipher) {
      throw new Error('Unsupported cipher');
  }
  var ciphertext = Buffer.from([
      ...cipher.update(Uint8Array.from(Buffer.from(privateKey.replace('0x', ''), 'hex'))),
      ...cipher.final()
  ]);
  var mac = keccak256(Uint8Array.from(Buffer.from([...derivedKey.slice(16, 32), ...ciphertext]))).replace('0x', '');
  return {
    ciphertext: ciphertext.toString('hex'),
    cipherparams: {
        iv: iv.toString('hex')
    },
    cipher: options.cipher || 'aes-128-ctr',
    kdf: kdf,
    kdfparams: kdfparams,
    mac: mac.toString()
  }
}
/**
 * Encrypts a private key using a password.
 * @param {*} privateKey 
 * @param {*} password 
 * @returns 
 */
export const encryptPrivateKey = async (privateKey, password) => {
   const encryptedData = await encrypt(privateKey, password, { kdf: 'argon2' });
   const { ciphertext, cipherparams, mac, kdfparams } = encryptedData;
  return `${cipherparams.iv}${kdfparams.salt}${mac}${ciphertext}`;
}

export const decryptPrivateKey = async (encryptedStr, password) => {
  const iv = encryptedStr.slice(0, 32);
  const salt = encryptedStr.slice(32, 96);
  const mac = encryptedStr.slice(96, 160);
  const ciphertext = encryptedStr.slice(160);
  return await decrypt({ 
    ciphertext, 
    cipherparams: { iv }, 
    cipher: "aes-128-ctr", 
    kdf: 'argon2', 
    mac, 
    kdfparams: { 
      salt,
      dklen: 32,
      t: 3,
      m: 4096,
      p: 1
    } 
  }, password);
}