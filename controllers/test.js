import {asyncQuery} from '../config/database.js';

// la requet
const sql = "SELECT * FROM users WHERE id = ?"

const test = async (req, res) => {
    const user1 = await asyncQuery(sql,[4])
    const rows = await asyncQuery(sql,[user1[0].role_id])
    res.json({rows})
}

export default test