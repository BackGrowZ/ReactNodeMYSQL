import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Connexion from "../components/Connexion";
import Register from "../components/Register";
import Profil from "../components/Profil";
import Admin from "../components/Admin";
import Deconnexion from "../components/Deconnexion";
import Middleware from "../components/Middleware";

const Routeur = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="connexion" element={<Connexion />} />
            <Route path="/profil" element={<Middleware><Profil /></Middleware>} />
            <Route path="/admin" element={<Middleware><Admin /></Middleware>} />
            <Route path="/deconnexion" element={<Deconnexion />} />
        </Routes>
    );
};

export default Routeur;