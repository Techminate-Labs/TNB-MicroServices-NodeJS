const express = require('express')
const router = express.Router()

//Controllers
const { getTransactions } = require('../app/Controllers/Account/Transaction')
const { 
    createNewAccount, generatePublicKey, generateSignature, verifySignature,
    signMessage, createBlockMessage, sendCoins
} = require('../app/Controllers/Blockchain/Account')


//Blockchain apis
//Accounts
router.get('/createNewAccount', createNewAccount)
router.get('/generatePublicKey/', generatePublicKey)
router.get('/generateSignature/', generateSignature)
router.get('/verifySignature/', verifySignature)
router.get('/signMessage/', signMessage)
router.post('/createBlockMessage/', createBlockMessage)

//PaymentHandler
router.get('/sendCoins/', sendCoins)

//Bank


module.exports = router