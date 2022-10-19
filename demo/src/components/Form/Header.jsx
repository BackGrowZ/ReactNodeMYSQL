const Header = ({children, onSubmit}) => {
    
    return (
            <form onSubmit={onSubmit}>{children}</form>
    )
}

export default Header