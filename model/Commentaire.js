class Commentaire {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
        this.commentary = {}
    }
    
    async create({article_id, contente, user_id}){
        const sql = "INSERT INTO commentaires (article_id, contente, user_id) VALUES (?,?,?)"
        const paramsSql = [article_id, contente, user_id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getById({id}){
        
        if(this.commentary[id]) { return this.commentary[id] }
        
        const sql = "SELECT * FROM commentaires WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            this.commentary = {...this.commentary, [id]:result}
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getByAuthor({user_id}){
        const sql = "SELECT * FROM commentaires WHERE user_id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[user_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getByArticles({article_id}){
        const sql = "SELECT * FROM commentaires WHERE article_id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[article_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getAll(){
        const sql = "SELECT * FROM commentaires"
        
        try{
            const result = await this.asyncQuery(sql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async update({title, contente, id}){
        const sql = "UPDATE commentaires SET contente = ? WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[title, contente, id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async deleted({id}){
        const sql = "DELETE commentaires WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
}

export default Commentaire