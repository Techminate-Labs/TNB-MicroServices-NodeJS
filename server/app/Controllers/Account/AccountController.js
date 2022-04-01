const asyncHandler = require('express-async-handler')
const { Bank } = require('@commandokoala/thenewboston')

const registerKey = asyncHandler(
    async(req, res) =>{
        const bank = new Bank("http://20.98.98.0");
        const transactions = await bank.getTransactions();
        if (transactions) {
            res.status(201).json({
                transactions: transactions
            })
        } else {
            res.status(404)
            throw new Error('Not found')
        }
    }
)

module.exports ={
    registerKey
}