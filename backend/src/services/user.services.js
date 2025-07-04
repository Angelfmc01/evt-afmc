import { usersModel} from '../models/relations.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userServices = {
    loginUser: async(correo, contrasena) =>{
        const user = await usersModel.findOne({where: {correo}})

        if(!user) return{succes: false, message: "Usuario no encontrado"}

        const validarContraseña = await bcrypt.compare(contrasena, user.contrasena)
        if(!validarContraseña) return {succes: false, messgae: "Contraseña incorrecta"}

        const token = jwt.sign({id: user.idUsuario, correo: user.correo, rol: user. idRol}, process.env.JWT_SECRET, {expiresIn: "1h"})

        return{ success: true, token, user: {nombre: user.nombre, rol: user.idRol}}
        
        
    }
}

export default userServices