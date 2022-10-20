const Option = ({attribut, children}) => {
    children && delete attribut.label
    return <option 
        {...attribut}
        >
            {children || attribut.label || attribut.value }
        </option>
}

export default Option