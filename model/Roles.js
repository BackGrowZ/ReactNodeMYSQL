class Role {
    constructor(bdd){
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery 
    }
    
    async getRoles(){
        const sql = "SELECT * FROM roles"
        
        try{
            const result = await this.asyncQuery(sql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async addRole(name){
        const sql = "INSERT INTO roles (name) VALUES (?)"
        
        try{
            const result = await this.asyncQuery(sql,[name])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async changeRole({user_id, role_id}){
        const sql = "UPDATE users SET role_id = ? WHERE id = ?"
        const paramsSql = [user_id, role_id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
}


export default Role