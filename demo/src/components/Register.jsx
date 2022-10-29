import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config/API.js';
import { useNavigate } from "react-router-dom";

// controlleur front Register pour la création de compute user
const Register = () => {
    
    // les différents états, response servira pour la redirection finale
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();
    
    const submit = (e) => {
        const data = {
            mail,
            password
        };
        
        e.preventDefault();
        axios.post(`${BASE_URL}/register`, data)
        .then((res) => {
            console.log(res.data)
            res.data.response ? navigate("/connexion") : window.alert("e-mail déjà utilisé")
        })
        .catch((err) => {
            console.log(err);
        })
    };
    
    return (
        <div>
            <h2>Formulaire d'inscription</h2>
            <form onSubmit={submit}>
                <label>Mail : 
                    <input type="mail" value={mail} onChange={(e) => setMail(e.target.value)} />
                </label>
                
                <label>Password : 
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>
                
                <input type="submit" value="valider"/>
            </form>
        </div>
    );
};

export default Register;