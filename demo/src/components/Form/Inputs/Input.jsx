import {Fragment} from 'react'
import Textarea from "./Textarea"
import Select from "./Select"
import Button from "./Button"

const Input = ({attribut, handleChange, errors, onBlur, disabledSubmit}) => {
    const {type} = attribut
    
    const onChange = (e) => {
        const value =  e.target.type === 'checkbox' ? e.target.checked : e.target.value
        handleChange(attribut.uid, value)
    }
    
    const errorStyle = errors && errors.state ? {outline:'1px solid red'} : {}
    const showError = () => errors && errors.state && errors.msg
    
    
    const filtredAttribut = {...attribut}
    delete filtredAttribut.pattern
    delete filtredAttribut.patternError
    
    if(type === "textarea") return <Textarea attribut={filtredAttribut} errors={errors} onBlur={onBlur} onChange={onChange}></Textarea>
    else if (type === "select") return <Select attribut={filtredAttribut} errors={errors} onChange={onChange}></Select>
    else if (type === "submit" || type === "reset") return <Button attribut={filtredAttribut} disabledSubmit={disabledSubmit} />
    else {
        return (
            <Fragment>
                <input {...filtredAttribut} style={errorStyle} onBlur={() => onBlur(attribut.uid,attribut.value)} onChange={onChange} />
                {showError() && <p className='error'>{errors.msg}</p>}
            </Fragment>
        )
    }
}

export default Input
