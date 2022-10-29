import bcrypt from 'bcrypt';
import { asyncQuery } from '../config/database.js';
import { inputsLength } from '../components/inputLength/index.js'

const register = async (req,res) => {
    const saltRounds = 10;
    
    const emailIsPresentSQL = "SELECT email FROM users WHERE email = ?"
    const AddUserSQL= "INSERT INTO users (email, password, role_id) VALUES ?"
    
    const dataForLengthCheck = [req.body.mail, req.body.password]
    const valueLengthValide =  inputsLength(dataForLengthCheck)
    
    const response = {
        emailExisting : { response: false, message:'Email deja present' },
        tooLong: { response:false, message:'Champs trop long' },
        error: { response:false, message:"Une erreur c'est produit" }
    }
    
    // Si un input est trop long
    if(!valueLengthValide) return res.json(response.tooLong);
    
    // Si l'email est deja en bdd
    const checkEmail = await asyncQuery(emailIsPresentSQL,[req.body.mail])
    console.log(checkEmail)
    if(checkEmail[0]) return res.json(response.emailExisting)
    
    // creation du compte
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
    const createUser = await asyncQuery(AddUserSQL,[[['email1', passwordHash, 1],['email2', passwordHash, 1]]])
    
    return res.json(createUser ? { response: true, user: createUser } : response.error)
    
};

export default register;