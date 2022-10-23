import bcrypt from 'bcrypt';
import {asyncQuery} from '../config/database.js';
import {generateToken} from "../controllers/token.js"

const getUserData = async (email) => {
    let getUserSQL = "SELECT * FROM users WHERE email = ?";
    const userDataSQL = await asyncQuery(getUserSQL,[email])
    
    return userDataSQL[0]
}

const isAdmin = (role_id) => {
    const ADMIN = 2
    const admin = role_id === ADMIN
    
    return admin
}

const generateResponse = async (userDataSQL,passwordMatch) => {
    const admin = isAdmin(userDataSQL.role_id)
    const userData = { 
        email:userDataSQL.email,
        user:true,
        admin
    }
    const token = await generateToken(userData)
    const sucessJson = {response:true, admin, token}
    const failJson = {response:false, message:"identifiant ou mot de passe incorrect"}
    
    return passwordMatch ? sucessJson : failJson
}

const connexionSubmit = async (req, res) => {
    const {password, mail} = req.body
    const userDataSQL = await getUserData(mail)
    const passwordMatch = await bcrypt.compare(password, userDataSQL.password)
    const response = await generateResponse(userDataSQL, passwordMatch)
    
    res.json(response)
}

export default connexionSubmit;