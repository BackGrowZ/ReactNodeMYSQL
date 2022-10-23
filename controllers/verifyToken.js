import parseurl from 'parseurl';
import {verifyToken} from './token.js'

const ADMIN = 'admin'
const USER = 'user'

const protectedPath = (pathname) => {
    const adminPath = ['adminPath'];
    const userPath = ['userPath'];
    
    const protectedAdmin = adminPath.includes(pathname)
    const protectedUser = userPath.includes(pathname)
    
    if(protectedAdmin){
        return ADMIN
    } else if(protectedUser){
        return USER
    } else {
        return false
    }
}

const accesAutorized = (pathname,userData) => {
    if(protectedPath(pathname) === ADMIN){
        if(userData){
            return userData.admin
        }
        return false
    } else if(protectedPath(pathname) === USER) {
        if(userData){
            return userData.user
        }
        return false
    } else {
        return true
    }
}

const middleware = async (req, res, next) => {
    let pathname = parseurl(req).pathname.split('/api/');
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null
    const userData = await verifyToken(token)
    if(accesAutorized(pathname[1],userData)){
        next()
    } else {
        res.json({response:false, msg:'acces refuser'})
    }
}

export {middleware, verifyToken}