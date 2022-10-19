/* 
attribut = {
 className
 type
 value
}
*/
const Input = ({attribut,handleChange}) => {
    const onChange = (e) => {
        const value =  e.target.type === 'checkbox' ? e.target.checked : e.target.value
        handleChange(attribut.key, value)
    }
    
    return <input {...attribut} onChange={onChange} />
}

export default Input
