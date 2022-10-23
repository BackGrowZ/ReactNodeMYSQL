import express from "express";

import registerSubmit from "../controllers/register.js";
import connexionSubmit from "../controllers/connexion.js";
import isLogged from "../controllers/isLogged.js";
import uploadFile from "../controllers/uploadFile.js";
import getUsersRole from "../controllers/getUsersRole.js";
import getPanier from "../controllers/getPanier.js";
import test from "../controllers/test.js";


const router = express.Router();

const defaultJson = (req, res) => {
    res.json({
        response:true
    });
}

router.get("/api/adminPath", (req,res) => {
    res.json({response:true, msg:'admin path'})
})

router.get("/api/userPath", (req,res) => {
    res.json({response:true, msg:'user path'})
})

router.get("/api/publicPath", (req,res) => {
    res.json({response:true, msg:'public path'})
})

router.post("/api/register", registerSubmit); // route back de l'enregistrement de l'utilisateur dans la BDD

router.post("/api/connexion", connexionSubmit); // route back de la connexion de l'utilisateur

router.post("/api/isLogged", isLogged); // route back de la connexion de l'utilisateur

router.post("/api/uploadFile", uploadFile); // route back de la connexion de l'utilisateur

router.post("/addAvis", defaultJson);

router.post("/changeRole", defaultJson);

router.get("/panier/:id", getPanier);

router.get("/getUsersRole", getUsersRole);

router.get("/test", test);

/*


*/

export default router;