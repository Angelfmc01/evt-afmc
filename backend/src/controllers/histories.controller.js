import historiesServices from '../services/histories.services.js'

const historiesController={
    getHistories: async(req, res) =>{
        try{
            const {movimiento } = req.query

            const response = await historiesServices.getHistories(movimiento)
            if(!response.success) return res.status(401).json({error: response.message})
            
            return res.status(200).json({data: response.data})
        }catch(err){
            res.status(500).json({error: "Error al obtener los historiales"})
        }
    }
}

export default historiesController