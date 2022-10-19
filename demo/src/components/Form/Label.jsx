const Label = ({children, texte = "", required=true}) => {
    return (
        <label>
            {texte}
            {children}
        </label>
    )
}

export default Label