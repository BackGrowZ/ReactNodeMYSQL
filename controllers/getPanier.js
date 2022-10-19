const getPanier = (req, res) => {
    res.json({
        response:true,
        pannier:
        [{id:0,image:'test',quantite:9,titre:'test',prix:'10'},{id:1,image:'test2',quantite:3,titre:'test2',prix:'100'}]
    
    });
}

export default getPanier