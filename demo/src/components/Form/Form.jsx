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
    const [disabledSubmit, setDisabledSubmit] = useState(false)
    
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
                    data[i] = defaultValue.type.includes(e) ? setAttribut(e,i) : setAttribut(TEXT,i)
                } else {
                    data[i] = {...data[i], uid:i}
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
    
    useEffect(() => {
        let result = false
        for(let i = 0; i<=errors.length; i++){
            if(i === errors.length){
                setDisabledSubmit(result)
            } else {
                if(errors[i].state){
                    result = true
                }
            }
        }
    },[errors])
    
    // Validation formulaire
    const onSubmit = (e) => {
        e.preventDefault()
        inputs.forEach( el => checkValue(el.uid, el.value))
        if(!isEmpty() && (passwordVerrify() === true && !disabledSubmit)){
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
    
    const createError = (id, msg = "") => {
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
    
    const checkValue = (id, value) => {
        console.log(id)
        console.log(value)
        checkPattern(id, value)
        minLength(id, value) 
        maxLength(id, value)
        isRequired(id, value)
    }
    
    const minLength = (id, value="") => {
        const {minLength} = inputs[id]
        if(minLength){
            const result = value.length >= minLength
            if(!result) createError(id,`Minimum ${minLength} caracteres`)
            return result
        }
        return true
    }
    
    const maxLength = (id, value="") => {
        const {maxLength} = inputs[id]
        if(maxLength){
            const result = value.length <= maxLength
            if(!result) createError(id,`Maximum ${maxLength} caracteres`)
            return result
        }
        return true
    }
    
    const isRequired = (id, value) => {
        const {required} = inputs[id]
        if(required && value === ""){
            createError(id, 'Champ obligatoire')
        }
    }
    
    const checkPattern = (id, value) => {
        if(inputs[id].pattern){
            const {pattern, patternError} = inputs[id]
            const regex = new RegExp(pattern)
            if(!regex.test(value)){
                const msgError = patternError || "Invalide"
                createError(id, msgError)
            }
        }
    }
    
    // assignations des attribut
    const setAttribut = (attribut,id) => {
        const uid = id
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
    // si il sont identique OU si il n'y a pas deux input de type password return true
    // si il sont PAS identique return false 
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
            return true
        }
    }
    
    
    return(
        <Header enctype={haveInputFile} onSubmit={onSubmit}>
            { inputs.map((e,i) => {  
                const attribut = setAttribut(e,i)
                console.log(attribut)
                return (
                    <Label key={i} checkbox={isCheckbox(e)} required={e.required} texte={e.label}>
                        <Input 
                            handleChange={handleChange}
                            disabledSubmit={disabledSubmit}
                            onBlur={checkValue}
                            errors={errors[i]}
                            attribut={attribut}
                        />
                    </Label>
                )
            })}
        </Header>
    )
}
export default Form