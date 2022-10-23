import axios from 'axios'
const Test = () => {
    const API = "http://najs01.sites.3wa.io:9300/api"
    const testingPath = (e, path) => {
        e.preventDefault()
        axios.get(`${API}${path}`)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <button onClick={(e) => testingPath(e,'/adminPath')}>ADMIN</button>
            <button onClick={(e) => testingPath(e,'/userPath')}>USER</button>
            <button onClick={(e) => testingPath(e,'/publicPath')}>PUBLIC</button>
        </div>
    )
}

export default Test