import {useState, useEffect, useContext, Fragment} from 'react'
import axios from 'axios'
import BASE_URL from "../config.js"
import {ReducerContext} from "./reducer/reducer"
const Panier = () => {
    
    const [state, dispatch] = useContext(ReducerContext)
    
    const [panier, setPanier] = useState([])
    const [total, setTotal] = useState("")
    
    useEffect(() => {
    //   axios.get(`${BASE_URL}/panier/${state.userid}`)
       axios.get(`${BASE_URL}/panier/1`)
       .then((res) =>{
           if(res.data.response){
               setPanier(res.data.pannier)
           } else {
               // echec
           }
       })
       .catch((err) => {
           console.log(err)
       })
    },[])
    
    useEffect(() => {
         setTotal(totalFn())
    },[panier])
    
    const updatePanier = () => {
    // axios.post(`${BASE_URL}/updatePanier/1`,{
        //     panier
        // })
        // .then((res) => {
            
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }
    
    const deleteArticle = (e,id) => {
        e.preventDefault()
        let newPanier = [...panier]
        newPanier = newPanier.filter((el) => el.id !== id )
        setPanier(newPanier)
        updatePanier()
    }
    
    const submit = (e) => {
       e.preventDefault()
       console.log('submit')
    }
    
    const totalFn = () => {
        let result = 0
        for(let i = 0; i< panier.length; i++){
            result += panier[i].quantite * panier[i].prix
        }
        return result
    }
    
    const updateQte = (e,id,decrementer) => {
        e.preventDefault()
        let newPanier = [...panier]
        newPanier.map((el) =>{
            if(el.id === id){
                el.quantite = decrementer ? el.quantite-1 : el.quantite+1
            }
        })
        setPanier(newPanier)
        updatePanier()
    }
    
   
    return (
        <Fragment>
            <table>
                <thead>
                    <tr>
                		<th>Image</th>
                		<th>Titre</th>
                		<th>Quantitée(s)</th>
                		<th>Prix unitaire</th>
                		<th>Action</th>
                	</tr>
                </thead>
                <tbody>
                {panier[0] && panier.map((el,i) => {
                    return(
                        <tr key={i}>
                            <td><img src={el.image} alt={el.title} /></td>
                            <td>{el.titre}</td>
                            <td>
                                <button onClick={(e) => updateQte(e,el.id,true)}>-</button>
                                {el.quantite}
                                <button onClick={(e) => updateQte(e,el.id,false)}>+</button>
                            </td>
                            <td>{el.prix}€</td>
                            <td><button onClick={(e) => deleteArticle(e,el.id)}>delete</button></td>
                        </tr>  
                    )
                })}
                </tbody>
            </table>
            <p> total: {total}€</p>
            <form onSubmit={submit}>
                <input type='submit' value='acheter' />
            </form>
        </Fragment>                       
    )
}

export default Panier