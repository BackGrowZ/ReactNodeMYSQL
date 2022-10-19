import express from "express";

import registerSubmit from "../controllers/register.js";
import connexionSubmit from "../controllers/connexion.js";
import isLogged from "../controllers/isLogged.js";
import uploadFile from "../controllers/uploadFile.js";
import getUsersRole from "../controllers/getUsersRole.js";
import getPanier from "../controllers/getPanier.js";


const router = express.Router();

const defaultJson = (req, res) => {
    res.json({
        response:true
    });
}

router.post("/api/register", registerSubmit); // route back de l'enregistrement de l'utilisateur dans la BDD

router.post("/api/connexion", connexionSubmit); // route back de la connexion de l'utilisateur

router.get("/api/isLogged", isLogged); // route back de la connexion de l'utilisateur

router.post("/api/uploadFile", uploadFile); // route back de la connexion de l'utilisateur

router.post("/addAvis", defaultJson);

router.post("/changeRole", defaultJson);

router.get("/panier/:id", getPanier);

router.get("/getUsersRole", getUsersRole);

/*


*/

export default router;