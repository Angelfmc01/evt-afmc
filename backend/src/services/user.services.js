import { usersModel} from '../models/relations.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userServices = {
    loginUser: async(correo, contrasena) =>{
        const user = await usersModel.findOne({where: {correo}})

        if(!user) return{succes: false, message: "Usuario no encontrado"}

        const validarContraseña = await bcrypt.compare(contrasena, user.contrasena)
        if(!validarContraseña) return {success: false, message: "Contraseña incorrecta"}

        const token = jwt.sign({idUsuario: user.idUsuario, correo: user.correo, rol: user.idRol, nombre: user.nombre}, process.env.JWT_SECRET, {expiresIn: "1h"})

        return{ success: true, token, user: {nombre: user.nombre, rol: user.idRol, correo: user.correo, idUsuario: user.idUsuario}}
        
        
    }
}

export default userServices