import mysql from "mysql";

let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "anthonycarreta", // identifiant BDD
    password: "acfff451642c9b6988a8a36616c1ba28", // le password
    database: "anthonycarreta_projetNode", // nom de la base de donnée
});

export default pool