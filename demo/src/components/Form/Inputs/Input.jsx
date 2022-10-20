import Textarea from "./Textarea"
import Select from "./Select"

const Input = ({attribut,handleChange}) => {
    const {type} = attribut
    
    const onChange = (e) => {
        const value =  e.target.type === 'checkbox' ? e.target.checked : e.target.value
        handleChange(attribut.uid, value)
    }
    
    if(type === "textarea") {
        return <Textarea attribut={attribut} onChange={onChange}></Textarea>
    } else if (type === "select"){
        return <Select attribut={attribut} onChange={onChange}></Select>
    } else {
        return <input {...attribut} onChange={onChange} />
    }
}

export default Input
