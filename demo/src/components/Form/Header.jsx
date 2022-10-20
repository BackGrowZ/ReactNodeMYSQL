const Header = ({children, onSubmit, enctype}) => {
    
    const attribut = {}
    if(enctype) attribut.encType = "multipart/form-data"
    
    return (
            <form {...attribut} onSubmit={onSubmit}>{children}</form>
    )
}

export default Header