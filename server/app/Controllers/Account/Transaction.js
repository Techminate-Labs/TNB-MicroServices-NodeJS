const asyncHandler = require('express-async-handler')
const { Account, Bank } = require('thenewboston')
const getTransactions = asyncHandler(
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
    getTransactions
}