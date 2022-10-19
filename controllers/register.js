import bcrypt from 'bcrypt';
import pool from '../config/database.js';
import {inputsLength} from '../components/inputLength/index.js'

const register = (req,res) => {
    
    const saltRounds = 10;
    let emailIsPresentSQL = "SELECT email FROM users WHERE email = ?"
    let AddUserSQL= "INSERT INTO users (email, password, role_id) VALUES (?, ?, 1)"
    // if(inputLength(req.body.mail) && inputLength(req.body.password,10)){
    if(inputsLength([req.body.mail,{value:req.body.password, maxLength:1}])){
        pool.query(emailIsPresentSQL, [req.body.mail], (error, user, fields) => {
            if (error) throw error;
            
            if(user[0]) {
                res.json({response:false, message:'Email deja present'});
            } else {
                bcrypt.hash(req.body.password, saltRounds, function(err, hash){
                    if(err) throw err;
                    
                    pool.query(AddUserSQL, [req.body.mail, hash], (error, register, fields) => {
                        res.json({response:true});
                    });
                });
            }
        });
    } else {
        res.json({response:false, msg:'champs trop long'});
    }
    
};

export default register;