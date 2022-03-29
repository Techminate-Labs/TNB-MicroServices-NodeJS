const asyncHandler = require('express-async-handler')
const { Account, Bank } = require('@commandokoala/thenewboston')

const getBankConfig = asyncHandler(
    async(req, res) =>{
        const bank = new Bank("http://20.98.98.0", { defaultPagination: { limit: 10, offset: 0 } });
        if(req.query.queryType = "config"){
            const config = await bank.getConfig();
            res.status(201).json(config);
        }else {
            res.status(404)
            throw new Error('Not found')
        }

        if(req.query.queryType = "accounts"){
            const accounts = await bank.getAccounts({ limit: 10, offset: 30 });
            res.status(201).json(accounts);
        }else {
            res.status(404)
            throw new Error('Not found')
        }

        if(req.query.queryType = "transactions"){
            const transactions = await bank.getTransactions({ limit: 10, offset: 30 });
            res.status(201).json(transactions);
        }else {
            res.status(404)
            throw new Error('Not found')
        }
    }
)

module.exports ={
    getBankConfig
}