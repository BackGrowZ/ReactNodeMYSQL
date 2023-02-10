import mysql from "mysql";

class BDD {
    constructor(){
        this.pool = mysql.createPool({
            connectionLimit : 10000,
            host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
            user: "anthonycarreta", // identifiant BDD
            password: "acfff451642c9b6988a8a36616c1ba28", // le password
            database: "anthonycarreta_exercices", // nom de la base de donnée
        });
    }
    
    async asyncQuery(sql, params = []){
        return new Promise((resolve, reject)=>{
            this.pool.query(sql,params, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }
}

export default BDD