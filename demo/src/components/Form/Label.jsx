import {capitalize} from '../../utils/utils.js'
const Label = ({children, texte = "", required=true, checkbox=false}) => {
    const labelText = required && texte !== "" ? texte+"*" : texte
    
    if(!checkbox){
        return (
            <label>
                {capitalize(labelText)}
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