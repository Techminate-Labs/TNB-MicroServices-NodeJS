const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { Account } = require('@commandokoala/thenewboston')

const createNewAccount = asyncHandler(
    async(req, res) =>{
        const account = new Account();

        if (account) {
            res.status(201).json({
                public_key: account.accountNumberHex,
                private_key: account.signingKeyHex
            })
        } else {
            res.status(404)
            throw new Error('Not found')
        }
    }
)

const generatePublicKey = asyncHandler(
    async(req, res) =>{
        const accountSigningKey = req.query.key;
        const account = new Account(accountSigningKey);

        if (account) {
            res.status(201).json({
                public_key: account.accountNumberHex,
                private_key: account.signingKeyHex
            })
        } else {
            res.status(404)
            throw new Error('Not found')
        }
    }
)

const generateSignature = asyncHandler(
    async(req, res) =>{
        const accountSigningKey = req.query.key;
        const account = new Account(accountSigningKey);
        const message = req.query.message;
        const signature = account.createSignature(message);
        const isValidPair = Account.isValidPair(account.signingKeyHex, account.accountNumberHex);
        
        if (account && isValidPair) {
            res.status(201).json({
                is_valid_pair : isValidPair,
                public_key: account.accountNumberHex,
                message:message,
                signature: signature,
            })
        } else {
            res.status(404)
            throw new Error('Invalid credentials')
        }
    }
)

const verifySignature = asyncHandler(
    async(req, res) =>{
        const publicKey = req.query.publicKey;
        const message = req.query.message;
        const signature = req.query.signature;

        const isValidSignature = Account.verifySignature(message, signature, publicKey);
        
        if (publicKey && message && signature) {
            res.status(201).json({
                is_valid_signature : isValidSignature,
                message:message,
                signature: signature,
            })
        } else {
            res.status(404)
            throw new Error('Invalid credentials')
        }
    }
)

module.exports ={
    createNewAccount,
    generatePublicKey,
    generateSignature,
    verifySignature
}