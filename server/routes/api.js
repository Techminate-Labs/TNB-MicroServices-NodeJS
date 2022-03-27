const express = require('express')
const router = express.Router()

//Controllers
const { getTransactions } = require('../app/Controllers/Account/Transaction')
const { 
    createNewAccount, generatePublicKey, generateSignature, verifySignature,
} = require('../app/Controllers/Account/Account')


//Blockchain apis
router.get('/getTransactions', getTransactions)

//Create Account
router.get('/createNewAccount', createNewAccount)
router.get('/generatePublicKey/', generatePublicKey)
router.get('/generateSignature/', generateSignature)
router.get('/verifySignature/', verifySignature)

module.exports = router