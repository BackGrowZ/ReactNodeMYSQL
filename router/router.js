import express from "express";

import registerSubmit from "../controllers/register.js";
import connexionSubmit from "../controllers/connexion.js";

const router = express.Router();

router.post("/api/register", registerSubmit); // route back de l'enregistrement de l'utilisateur dans la BDD

router.post("/api/connexion", connexionSubmit); // route back de la connexion de l'utilisateur

/*


*/

export default router;