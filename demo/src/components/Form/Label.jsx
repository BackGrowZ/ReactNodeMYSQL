const Label = ({children, texte = "", required=true, checkbox=false}) => {
    const labelText = required && texte !== "" ? texte+"*" : texte
    
    if(!checkbox){
        return (
            <label>
                {labelText}
                {children}
            </label>
        )
    } else {
        return (
            <label>
                {children}
                {labelText}
            </label>
        )
    }
}

export default Label