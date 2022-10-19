import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import BASE_URL from "../config.js"
import {ReducerContext} from "./reducer/reducer"
const AddAvis = () => {
    
    const [state, dispatch] = useContext(ReducerContext)
    
    const [titre, setTitre] = useState("")
    const [avis, setAvis] = useState("")
    
    const submit = () => {
        axios.post(`${BASE_URL}/addAvis`,{
            titre,
            avis,
            userid:state.userid
        })
        .then((res) => {
            if(res.data.response){
                // success
            } else {
                // echec
            }
        })
        .catch((err) => {
            console.log(err)
        })
        .then(() => {
            setAvis("")
            setTitre("")
        })
        
    }
    
   
    return (
        <form onSubmit={submit}>
            <label>
                Titre
                <input type='text' value={titre} onChange={(e) => setTitre(e.target.value)} />
            </label>
            <label>
                Avis
                <input type='text' value={avis} onChange={(e) => setAvis(e.target.value)} />
            </label>
            <input type='submit' value='Partager' />
        </form>
                               
    )
}

export default AddAvis