import {useState, useEffect} from "react"
import Header from './Header'
import Input from './Inputs/Input'
import Label from './Label'
import {OBJECT, STRING, TEXT, defaultValue} from './constante.js'

const Form = ({input = [], submit = defaultValue.submit, clear = defaultValue.clear, template = null}) => {
    
    const [inputs, setInputs] = useState(input)
    const [errors, setErrors] = useState([]) // TODO
    const [haveInputFile, setHaveInputFile] = useState(false)
    const [updating, setUpdating] = useState(false)
    
    // met les input de la template form demander
    useEffect(() => {
        if(template){
            let newInput = [...defaultValue.form[template]]
            setInputs(newInput)
            setUpdating(true)
        }
    },[])
    
    // mise en forme des input a l'initialisation
    useEffect(() => {
        if(inputs[0]){
            const data = [...inputs]
            inputs.map((e,i) => {
            // Si la valeur est un object on le laisse sinon on creer les attribut
                if(typeof e !== OBJECT){
                    // Si c'est un string qui contient le type on creer les attribut avec ce type
                    // sinon on creer les attribut avec le type text
                    data[i] = defaultValue.type.includes(e) ? setAttribut(e) : setAttribut(TEXT)
                }
            })
            initErrors()
            setInputs(data)
        } 
    },[updating])
    
    // determine si il y a un input de type file
    useEffect(() => {
        let result = false
        inputs.map((e) => {
            if(e.type === "file") result = true
        })
        setHaveInputFile(result)
    },[inputs])
    
    // Validation formulaire
    const onSubmit = (e) => {
        e.preventDefault()
        if(!isEmpty() && (passwordVerrify() === true || passwordVerrify() === undefined)){
          submit()
          clear && clearForm(inputs)
        } 
    }
    
    // retourne false si le type est submit ou reset
    const notButton = (input) => {
        return input.type !== 'submit' && input.type !== 'reset' 
    }
    
    // vide les input
    const clearForm = (inputs) => {
        const result = [...inputs]
        result.map((e,i) => {
            e.value= notButton(e) ? defaultValue.value[e.type] : e.value
        })
        setInputs(result)
    }
    
    // verrifie si les input required sont vide
    const isEmpty = () => {
        let result = false
        inputs.map((e,i) => {
            if(e.required && e.value === "") result = true
        })
        return result
    }
    
    // ecriture dans les input
    const handleChange = (id, value) => {
        const newInputs = [...inputs]
        if(newInputs[id].type === "checkbox"){
            newInputs[id].checked = value
            newInputs[id].value = value
        } else {
            newInputs[id].value = value
        }
        removeError(id)
        setInputs(newInputs)
    }
    
    const initErrors = () => {
        const result = []
        inputs.map((e,i) => {
            result.push({id:i,msg:"",state:false})
        })
        setErrors(result)
    }
    
    const createError = (id,msg="") => {
        const result = [...errors]
        result[id].msg = msg
        result[id].state = true
        setErrors(result)
    }
    
    const removeError = (id) => {
        const result = [...errors]
        result[id].msg = ""
        result[id].state = false
        setErrors(result)
    }
    
    // verrifie 
    const checkPattern = (id, value) => {
        const {pattern, patternError} = inputs[id]
        const regex = new RegExp(pattern)
        if(pattern){
            if(!regex.test(value)){
                createError(id, patternError)
            } else {
                removeError(id)
            }
        }
    }
    
    // assignations des attribut
    const setAttribut = (attribut) => {
        const uid = inputs.length-1
        let result = { type:TEXT, uid, value:defaultValue.value[attribut] || ''}
        
        // verrification du type pour mettre les attribut 
        if(typeof attribut === STRING && defaultValue.type.includes(attribut)){
            if(defaultValue.input[attribut]){
                result = {...result, label:attribut, ...defaultValue.input[attribut] }
            } else {
                result = {...result, type:attribut, label:attribut }
            }
        } else if(typeof attribut === OBJECT) {
            result = {...result,...attribut}
        }
        
        return result
    }
    
    // retourn true si le input est de type file
    const isCheckbox = (e) => {
        return e.type === "checkbox"
    }
    
    // verrifie si il y a deux input de type password
    // si il sont identique return true
    // si il sont PAS identique return false 
    // si il n'y a pas deux input de type password return undefined
    const passwordVerrify = () => {
        let password
        let password2
        inputs.map((e,i) => {
            if(e.type === "password"){
                if(!password){
                  password = e.value  
                } else {
                    password2 = e.value
                }
            }
        })
        if(password && password2){
            return password === password2
        } else {
            return undefined
        }
    }
    
    
    return(
        <Header enctype={haveInputFile} onSubmit={onSubmit}>
            { inputs.map((e,i) => {  
                const attribut = setAttribut(e,i)
                attribut.uid = i
                return (
                    <Label key={i} checkbox={isCheckbox(e)} texte={e.label}>
                        <Input handleChange={handleChange} onBlur={checkPattern} errors={errors[i]} attribut={attribut}/>
                    </Label>
                )
            })}
        </Header>
    )
}
export default Form