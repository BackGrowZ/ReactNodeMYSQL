import {useEffect, useContext} from "react"
import { ReducerContext } from "../reducer/reducer.js";
import {LOGOUT} from '../config/constante.js'
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Deconnexion = () => {
    const [state, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        dispatch({type:LOGOUT}) 
        navigate("/")
    },[])
};

export default Deconnexion;