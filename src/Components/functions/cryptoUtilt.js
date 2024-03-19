import CryptoJS from 'crypto-js';

export const encryptText = (text, key) => {
    try {
        return CryptoJS.AES.encrypt(text, key).toString();
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }
};

export const decryptText = (encryptedText, key) => {
    try {
        return CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};