import {useContext, useEffect, useState, Fragment} from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ReducerContext } from "../reducer/reducer.js";
import { userPath, adminPath } from '../config/path.js'

const Middleware = ({children}) => {
    const [state, dispatch] = useContext(ReducerContext)
    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    const location = useLocation()
    const currentPath = location.pathname

    useEffect(() => {
        if(userPath.includes(currentPath)){
            if(!state.login){
                navigate('/')
            }
        }
        setShow(true)

        if(adminPath.includes(currentPath)){
            if(!state.admin){
                navigate('/')
            }
        }
    }, [currentPath]);

    return(
        <Fragment>
            {show && children}
        </Fragment>
    )
}

export default Middleware