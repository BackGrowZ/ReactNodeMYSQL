import bcrypt from 'bcrypt';
import {asyncQuery} from '../config/database.js';
import {generateToken} from "../controllers/token.js"

const getUserData = async (email) => {
    let getUserSQL = "SELECT * FROM users WHERE email = ?";
    const userDataSQL = await asyncQuery(getUserSQL,[email])
    
    return userDataSQL[0]
}

const generateResponse = async (userDataSQL) => {
    const ADMIN_ROLE_ID = 2
    const admin = userDataSQL.role_id === ADMIN_ROLE_ID
    const userData = { 
        email:userDataSQL.email,
        user:true,
        admin
    }
    const token = await generateToken(userData)
    
    return {response:true, admin, token}
}

const connexionSubmit = async (req, res) => {
    const {password, mail} = req.body
    const failJson = {response:false, message:"identifiant ou mot de passe incorrect"}
    const userDataSQL = await getUserData(mail)
    const passwordMatch = userDataSQL ? await bcrypt.compare(password, userDataSQL.password) : null
    const response = (userDataSQL && passwordMatch) ? await generateResponse(userDataSQL, passwordMatch): failJson
    
    res.json(response)
}

export default connexionSubmit;