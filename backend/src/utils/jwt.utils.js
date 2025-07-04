import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

const verificarToken = (token) =>{
    const SECRET_KEY = process.env.JWT_SECRET

    return new Promise((resolve, reject) =>{
        jwt.verify(token, SECRET_KEY, (err, decode) =>{
            if(err){
                console.log("Error al verificar el roken")
                reject(err)
            }else{
                resolve(decode)
            }
        })
    })
}

export default verificarToken