import Home from "../components/Home";
import Connexion from "../components/Connexion";
import Register from "../components/Register";
import Profil from "../components/Profil";
import Admin from "../components/Admin";
import Test from "../components/Test";
import Deconnexion from "../components/Deconnexion";
import UploadFile from "../components/UploadFile";
import Form from "../components/Form/Form";

const input = [
    'password',
    "text",
    "email",
    {type:"text", label:'test', required:true},
    {type:"text", label:"max1", maxLength:'1'},
    {type:"text", label:"min1", minLength:'1'},
    // { type:'text', value:'text', pattern:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, patternError:'Adresse email invalide'},
    // { type:'checkbox', label:'checkbox', checked:true},
    { type:'select', label:'checkbox', options:[{value:0, label:"Option 0"},{value:1}]},
    { type:'submit', value:'text'}
]

export const routes = [
    { path:'/', element:<Home /> },
    { path:'/register', element:<Register /> },
    { path:'/connexion', element:<Connexion /> },
    { path:'/profil', element:<Profil /> },
    { path:'/admin', element:<Admin /> },
    { path:'/deconnexion', element:<Deconnexion /> },
    { path:'/upload', element:<UploadFile /> },
    { path:'/form', element:<Form input={input} /> },
    { path:'/test', element:<Test /> }
]

// route reserver au personne connecter
export const userPath = [
    '/profil'    
]

// route resserver au personne connecter en admin
export const adminPath = [
    "/admin"
]