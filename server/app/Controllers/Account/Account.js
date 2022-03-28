const asyncHandler = require('express-async-handler')
const { Account, AccountPaymentHandler } = require('@commandokoala/thenewboston')

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
            res.status(200).json({
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
            res.status(200).json({
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
            res.status(200).json({
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

const signMessage = asyncHandler(
    async(req, res) =>{
        const accountSigningKey = req.query.key;
        const account = new Account(accountSigningKey);
        const message = req.query.message;
        const signedMessage = account.createSignedMessage(message);

        if (signedMessage) {
            res.status(200).json(signedMessage)
        } else {
            res.status(404)
            throw new Error('Invalid credentials')
        }
    }
)

const createBlockMessage = asyncHandler(
    async(req, res) =>{
        const accountSigningKey = req.query.key;
        const account = new Account(accountSigningKey);
        const balanceKey = req.query.balanceKey;
        const txs = [{amount: 23,recipient: "tuna"},{amount: 2,recipient: "baconandtuna"}]
        const signedMessage = account.createBlockMessage(balanceKey, txs);

        if (account) {
            res.status(200).json(signedMessage)
        } else {
            res.status(404)
            throw new Error('Invalid credentials')
        }
    }
)

const sendCoins = asyncHandler(
    async(req, res) =>{
        const accountSigningKey = req.query.senderPrivateKey
        const sendersAccount = new Account(accountSigningKey);
        const bankUrl = req.query.bankUrl;
        
        const paymentHandlerOptions = {
          account: sendersAccount,
          bankUrl: bankUrl,
        };
        
        const paymentHandler = new AccountPaymentHandler(paymentHandlerOptions);
        
        // Method for getting the Bank and Primary validator Transactions fees
        await paymentHandler.init();
        
        //recipients public key
        const recipientAccount = req.query.recipientPublicKey
        const amount = parseInt(req.query.amount)

        let success = await paymentHandler.sendCoins(recipientAccount, amount, "memo");

        if (success) {
            res.status(200).json(success)
        } else {
            res.status(404)
            throw new Error('Invalid credentials')
        }
    }
)

const bulkTransactions = asyncHandler(
    async(req, res) =>{
        const accountSigningKey = '58286cd054aa6734d6bcf6407b19f2f4aae5b4bd904a9831958c305c7041e490';
        const sendersAccount = new Account(accountSigningKey);
        const bankUrl = "http://20.98.98.0";
        
        const paymentHandlerOptions = {
          account: sendersAccount,
          bankUrl: bankUrl,
        };
        
        const paymentHandler = new AccountPaymentHandler(paymentHandlerOptions);
        
        // Method for getting the Bank and Primary validator Transactions fees
        await paymentHandler.init();
        
        const txs = [
            {
              amount: 10,
              recipient: "8c44cb32b7b0394fe7c6a8c1778d19d095063249b734b226b28d9fb2115dbc74",
            }
        ];
          
        let success = await paymentHandler.sendBulkTransactions(txs);

        if (success) {
            res.status(200).json(success)
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
    verifySignature,
    signMessage,
    createBlockMessage,
    sendCoins,
    bulkTransactions
}