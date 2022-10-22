const Textarea = ({attribut, onChange, onBlur}) => {
    return <textarea {...attribut} onBlur={() => onBlur(attribut.uid,attribut.value)} onChange={onChange}></textarea>
}

export default Textarea