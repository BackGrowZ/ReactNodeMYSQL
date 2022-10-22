const Button = ({attribut, disabledSubmit}) => {
    const attributFiltred = {...attribut}
    delete attributFiltred.label
    
    return <input {...attributFiltred} disabled={disabledSubmit} />
}

export default Button