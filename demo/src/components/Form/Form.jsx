import {useState, useEffect} from "react"
import Header from './Header'
import Input from './Input'
import Label from './Label'

const OBJECT = "object"
const STRING = "string"
const TEXT = "text"

const defaultValue = {
    type: [TEXT, 'email', 'number', 'date','submit','reset','password' ],
    input: [ { value:'', type:TEXT }
    ],
    value: {
        number:0,
        text:'',
        checkbox:false,
        submit:'validé',
        reset:'reset'
    },
    submit:() => console.log('test'),
    clear:false
}

const Form = ({
        input = defaultValue.input,
        submit = defaultValue.submit,
        clear = defaultValue.clear
}) => {
    
    const [inputs, setInputs] = useState(input)
    
    // Validation formulaire
    const onSubmit = (e) => {
        e.preventDefault()
        submit()
        clear && clearForm(inputs)
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
    
    // ecriture dans les input
    const handleChange = (id, value) => {
        const newInputs = [...inputs]
        newInputs[id].value = value
        setInputs(newInputs)
    }
    
    // mise en forme des input a l'initialisation
    useEffect(() => {
        const data = [...inputs]
        inputs.map((e,i) => {
        // Si la valeur est un object on le laisse sinon on creer les attribut
            if(typeof e !== OBJECT){
                // Si c'est un string qui contient le type on creer les attribut avec ce type
                // sinon on creer les attribut avec le type text
               data[i] = defaultValue.type.includes(e) ?
                setAttribut(e) : setAttribut(TEXT)
            }
        })
        setInputs(data)
    },[])
    
    
    // assignations des attribut
    const setAttribut = (attribut) => {
        const key = inputs.length-1
        let result = { type:TEXT, key, value:defaultValue.value[attribut] || ''}
        
        // verrification du type pour mettre les attribut 
        if(typeof attribut === STRING && defaultValue.type.includes(attribut)){
            result = {...result, type:attribut }
        } else if(typeof attribut === OBJECT) {
            result = {...result,...attribut}
        }
        
        return result
    }
    

    
    return(
        <Header onSubmit={onSubmit}>
            { 
                inputs.map((e,i) => {  
                    const attribut = setAttribut(e,i)
                    attribut.key = i
                        return (
                            <Label key={i} texte={e.label}>
                                <Input handleChange={handleChange} attribut={attribut}/>
                            </Label>
                        )
                })
            }
        </Header>
    )
}
export default Form