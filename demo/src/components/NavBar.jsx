import { NavLink } from "react-router-dom";
import {useContext, Fragment} from "react"
import { ReducerContext } from "../reducer/reducer.js";

const NavBar = (props) => {
  
  const [state, dispatch] = useContext(ReducerContext)
  
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
