class Article {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
    }
    
    async create({title, contente, user_id}){
        const sql = "INSERT INTO articles (title, contente, user_id) VALUES (?,?,?)"
        const paramsSql = [title, contente, user_id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getById({id}){
        const sql = "SELECT * FROM articles WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getByAuthor({user_id}){
        const sql = "SELECT * FROM articles WHERE user_id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[user_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getAll(){
        const sql = "SELECT * FROM articles"
        
        try{
            const result = await this.asyncQuery(sql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async update({title, contente, id}){
        const sql = "UPDATE articles SET title = ?, contente = ? WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[title, contente, id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async deleted({id}){
        const sql = "DELETE articles WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
}

export default Article