//	id,url,captions,products_id
class PictureProducts {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
    }
    
    async create({url,captions,products_id}){
        const sql = "INSERT INTO pictures_products (url,captions,products_id) VALUES (?,?,?)"
        const paramsSql = [url,captions,products_id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getById({id}){
        const sql = "SELECT * FROM pictures_products WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async getByProductId({products_id}){
        const sql = "SELECT * FROM pictures_products WHERE products_id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[products_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    
    async getAll(){
        const sql = "SELECT * FROM pictures_products"
        
        try{
            const result = await this.asyncQuery(sql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async update({url,captions,products_id,id}){
        const sql = "UPDATE pictures_products SET url=?,captions=?,products_id=? WHERE id = ?"
        const paramsSql = [url,captions,products_id,id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async deletedById({id}){
        const sql = "DELETE pictures_products WHERE id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async deletedByProductId({products_id}){
        const sql = "DELETE pictures_products WHERE products_id = ?"
        
        try{
            const result = await this.asyncQuery(sql,[products_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
}

export default PictureProducts