const asyncHandler = require('express-async-handler')
const { Bank } = require('@commandokoala/thenewboston')

const registerKey = asyncHandler(
    async(req, res) =>{
        const account_number = res.body.account_number;
        const agent_pk = "pk"
        //validate pk
        const user_id = req.user.id
         //check if user already has an registered account
        //
        //check if user is already on registraton process
        const user_exit = "0"
        if(user_exit){
            //
        }else{
            //
        }
    }
)

module.exports ={
    registerKey
}