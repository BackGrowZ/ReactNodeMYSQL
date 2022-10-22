import {capitalize} from '../../utils/utils.js'
const Label = ({children, texte = "", required, checkbox=false}) => {
    const labelText = required && texte !== "" ? texte+"*" : texte
    
    if(!checkbox){
        return (
            <label>
                <p>{capitalize(labelText)}</p>
                {children}
            </label>
        )
    } else {
        return (
            <label>
                {children}
                {capitalize(labelText)}
            </label>
        )
    }
}

export default Label