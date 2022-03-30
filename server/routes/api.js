const express = require('express')
const router = express.Router()

//Controllers
const { register, login, authUser } = require('../app/Controllers/Auth/AuthController')

const { getTransactions } = require('../app/Controllers/Account/Transaction')
const { 
    createNewAccount, generatePublicKey, generateSignature, verifySignature,
    signMessage, createBlockMessage, sendCoins
} = require('../app/Controllers/Blockchain/Account')

//Auth apis
router.post('/register', register)
router.post('/login', login)
router.get('/authUser', protect, authUser)

//Accounts


//Blockchain apis
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