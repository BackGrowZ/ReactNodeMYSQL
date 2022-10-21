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
        console.log(0)
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
                    console.log(e)
                if(typeof e !== OBJECT){
                    // Si c'est un string qui contient le type on creer les attribut avec ce type
                    // sinon on creer les attribut avec le type text
                    data[i] = defaultValue.type.includes(e) ? setAttribut(e) : setAttribut(TEXT)
                }
            })
            setInputs(data)
        } else {
            console.log('nop')
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
        if(!isEmpty()){
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
            console.log(e)
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
        setInputs(newInputs)
    }
    
    // assignations des attribut
    const setAttribut = (attribut) => {
        console.log(attribut)
        const uid = inputs.length-1
        let result = { type:TEXT, uid, value:defaultValue.value[attribut] || ''}
        
        // verrification du type pour mettre les attribut 
        if(typeof attribut === STRING && defaultValue.type.includes(attribut)){
            result = {...result, type:attribut, label:attribut }
        } else if(typeof attribut === OBJECT) {
            result = {...result,...attribut}
        }
        
        return result
    }
    
    // retourn true si le input est de type file
    const isCheckbox = (e) => {
        return e.type === "checkbox"
    }
    
    
    return(
        <Header enctype={haveInputFile} onSubmit={onSubmit}>
            { inputs.map((e,i) => {  
                const attribut = setAttribut(e,i)
                attribut.uid = i
                return (
                    <Label key={i} checkbox={isCheckbox(e)} texte={e.label}>
                        <Input handleChange={handleChange} attribut={attribut}/>
                    </Label>
                )
            })}
        </Header>
    )
}
export default Form