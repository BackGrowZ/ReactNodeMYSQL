import bcrypt from 'bcrypt';
import pool from '../config/database.js';


const connexionSubmit = (req,res) => {
    let getPasswordSQL = "SELECT password,role_id FROM users WHERE email = ?";
    
    const msgError = "identifiant ou mot de passe incorrect"
    
    pool.query(getPasswordSQL, [req.body.mail], (error, user, fields) => {
        if (error) throw error;
        
        if(user[0]) {
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if (err) throw err;
                if(result === false) {
                    res.json({response:false, message:msgError});
                } else {
                    const admin = user[0].role_id === 1 ? false : true
                    res.json({response:true, admin});
                }
            });
        }else {
            res.json({response:false, message:msgError});
        }
    });
};

export default connexionSubmit;