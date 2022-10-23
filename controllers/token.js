import jwt from "jsonwebtoken"

const privateKey = 'fdsfsdfsdfsdfs'

export const LoginWithToken = async (userData) => {
    const token = await jwt.sign(userData, privateKey)
    
    return token
}

export const generateToken = async (userData) => {
    const token = await jwt.sign(userData, privateKey)
    return token
}

export const verifyToken = async (token) => {
    if(token) {
        const jwtToken = await jwt.verify(token, privateKey)
        return jwtToken

    } else {
        return undefined
    }
}