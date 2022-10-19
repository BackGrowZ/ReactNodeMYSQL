/* 
attribut = {
 className
 type
 value
}
*/
const Input = ({attribut,handleChange}) => {
    return (
        <input 
            {...attribut}
            onChange={(e) => handleChange(attribut.key, e.target.value)}
        />    
    )
}

export default Input