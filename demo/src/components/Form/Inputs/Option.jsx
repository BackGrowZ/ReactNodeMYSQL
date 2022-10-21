const Option = ({attribut, children}) => {
    children && delete attribut.label
    
    const value = children || attribut.label || attribut.value
    
    return <option {...attribut}>{value}</option>
}

export default Option