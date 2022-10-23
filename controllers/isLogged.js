import {verifyToken} from './verifyToken.js'
import {LoginWithToken} from './token.js'

const isLogged = async (req,res) => {
    console.log(req.body.token)
    const userData = await verifyToken(req.body.token)
    if(userData){
        const token = await LoginWithToken(userData)
        res.json({response:true, logged:userData.user, admin:userData.admin, token})
    } else {
        res.json({response:false})
    }
};

export default isLogged;