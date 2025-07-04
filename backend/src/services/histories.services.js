import { historiesModel } from "../models/relations.js";

const historiesServices = {
    getHistories: async (movimiento= null) =>{
        try{
            const filtrar = {}
            if(movimiento !== null) filtrar.movimiento = movimiento

            const historial = await historiesModel.findAll({where: filtrar})
            return { success: true, data: historial}
        }catch(err){
            console.log(err)
            return { success: false, message: "Error, intentalo de nuevo"}

        }

    }
}

export default historiesServices