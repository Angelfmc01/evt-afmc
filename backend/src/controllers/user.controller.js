import userServices from "../services/user.services.js";

const userController = {
    loginUser: async(req, res) =>{
        try{
            const { correo, contrasena} = req.body
            const result = await userServices.loginUser(correo, contrasena)
            if(!result.success) return res.status(401).json({ message: result.message });

            return res.status(200).json({token: result.token, user: result.user});
        }catch(err){
            console.log(err)
            res.status(500).json({ error: "Error al iniciar sesión" });
        }
    }
}

export default userController