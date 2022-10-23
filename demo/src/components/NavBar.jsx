import { NavLink } from "react-router-dom";
import {useContext, Fragment, useEffect} from "react"
import { ReducerContext } from "../reducer/reducer.js";
import BASE_URL from '../config/API.js';
import {LOGIN,ADMIN} from '../config/constante.js';
import axios from 'axios';


const NavBar = (props) => {
  
  const [state, dispatch] = useContext(ReducerContext)
  
  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    console.log(token)
    if(!state.login && token){
      axios.post(`${BASE_URL}/isLogged`,{token})
      .then((res) => {
        console.log(res)
        if(res.data.token){
          console.log(res.data.token === token)
          axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.token
        }
        res.data.logged && dispatch({type:LOGIN})
        res.data.admin && dispatch({type:ADMIN})
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })
  
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            HOME
          </NavLink>
        </li>
        {!state.login &&
        <Fragment>
          <li>
              <NavLink to="/register">
              REGISTER
              </NavLink>
          </li>
          <li>
            <NavLink to="/connexion">
              LOGIN
            </NavLink>
          </li>
        </Fragment>
        }
        {state.login && 
          <Fragment>
            <li>
              <NavLink to="/test">
                test
              </NavLink>
            </li>
            <li>
              <NavLink to="/profil">
                PROFIL
              </NavLink>
            </li>
            <li>
              <NavLink to="/deconnexion">
                LOGOUT
              </NavLink>
            </li>
          </Fragment>
        }
        {state.admin && 
          <li>
            <NavLink to="/admin">
              ADMIN
            </NavLink>
          </li>
        }
      </ul>
    </nav>
  );
};

export default NavBar;
