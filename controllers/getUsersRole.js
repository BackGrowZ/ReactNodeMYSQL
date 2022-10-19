const getUsersRole = (req, res) => {
    res.json({
        response:true,
        users:
        [{id:0,
        roleId:1,
        email:'test@me.fr'}]
    
    });
}

export default getUsersRole