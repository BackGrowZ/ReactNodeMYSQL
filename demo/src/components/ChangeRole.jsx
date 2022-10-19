import {useState, useEffect} from 'react'
import axios from 'axios'
import BASE_URL from "../config.js"
const ChangeRoles = () => {
    const [roles, setRoles] = useState(null)
    const [userid, setUserid] = useState(null)
    const [users, setUsers] = useState([])
    
    useEffect(() => {
       axios.get(`${BASE_URL}/getUsersRole`)
       .then((res) => {
           if(res.data.response){
               setUsers(res.data.users)
           } else {
               // error 
           }
       })
       .catch((err) => {
           console.log(err)
       })
    },[])
    
    const submit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/changeRole`,{
            id:userid,
            roles
        }).then((res) => {
            //success
        })
        .catch((err) => {
            console.log(err)
        })
        .then(() => {
            updateUser()
            reset()
        })
        
    }
    
    const updateUser = () => {
        const newUser = [...users]
        
        newUser.map((e) => {
            if(e.id === userid){
                e.roleId = roles
            }
        })
        setUsers(newUser)
    }
    
    const reset = () => {
        setUserid(null)
        setRoles(null)
    }
    
    const selected = (id,role) => {
        setUserid(id)
        setRoles(role)
    }
    
    return (
        <table>
            <thead>
                <tr>
                    <th>id</th>
                    <th>email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
            {users[0] && 
                users.map((e) => {
                    return(
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.email}</td>
                            {userid === null ?
                                <td onClick={() => selected(e.id,e.roleId)}>{e.roleId === 1 ? "Admin" : "User"}</td>
                            :
                                <td>
                                    <form onSubmit={submit} onReset={reset}>
                                        <select value={roles} onChange={(e) => setRoles(e.target.value)}>
                                            <option value="1">Admin</option>
                                            <option value="2">User</option>
                                        </select>
                                        <input type='submit' value='Enregistrer' />
                                        <input type='reset' value='Annuler' />
                                    </form>
                                </td>
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default ChangeRoles