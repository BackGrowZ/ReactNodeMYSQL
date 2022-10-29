import {generateToken, verifyToken} from './token.js'

const isLogged = async (req,res) => {
    const userData = await verifyToken(req.body.token)
    const token = userData ? await generateToken(userData) : null
    const responseTrue = {response:true, logged:userData.user, admin:userData.admin, token}
    const responseFalse = {response:false}
    const response = userData ? responseTrue  : responseFalse
    
    res.json(response)
};

export default isLogged;