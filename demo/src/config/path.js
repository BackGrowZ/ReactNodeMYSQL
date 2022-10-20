import Home from "../components/Home";
import Connexion from "../components/Connexion";
import Register from "../components/Register";
import Profil from "../components/Profil";
import Admin from "../components/Admin";
import Deconnexion from "../components/Deconnexion";
import UploadFile from "../components/UploadFile";
import Form from "../components/Form/Form";

const input = [
    // 'text',
    // { type:'text', value:'text'},
    // { type:'checkbox', label:'checkbox', checked:true},
    { type:'select', label:'checkbox', options:[{value:0, label:"Option 0"},{value:1}]},
    // { type:'submit', value:'text'}
]

export const routes = [
    { path:'/', element:<Home /> },
    { path:'/register', element:<Register /> },
    { path:'/connexion', element:<Connexion /> },
    { path:'/profil', element:<Profil /> },
    { path:'/admin', element:<Admin /> },
    { path:'/deconnexion', element:<Deconnexion /> },
    { path:'/upload', element:<UploadFile /> },
    { path:'/form', element:<Form input={input} /> }
]

// route reserver au personne connecter
export const userPath = [
    '/profil'    
]

// route resserver au personne connecter en admin
export const adminPath = [
    "/admin"
]