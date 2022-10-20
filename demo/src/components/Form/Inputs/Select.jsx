import Option from "./Option"

const Select = ({attribut, onChange}) => {
    const filtredAttribut = {...attribut}
        delete filtredAttribut.options
        delete filtredAttribut.label
        delete filtredAttribut.uid
        
        return (
            <select {...filtredAttribut} onChange={onChange} value={attribut.value}>
                {attribut.options.map((e,i) => {
                    return <Option key={i} attribut={e} />
                })}
            
            </select>
        )
}

export default Select