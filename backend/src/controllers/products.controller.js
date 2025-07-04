import productsService from '../services/products.services.js'

const productsController = {
    getProducts: async(req, res) =>{
        try{
            const response = await productsService.getProducts()
            if(!response.success) return res.status(401).json({error: response.message})

            return res.status(200).json({ data: response.data})
        }catch(err){
            res.status(500).json({ error: "Error al obtener los productos"})
        }

    },

    createProduct: async(req, res) =>{
        try{
            const { nombre, precio, estatus } = req.body
            const response = await productsService.createProduct(nombre, precio, estatus)
            if(!response.success) return res.status(401).json({error: response.message})

            return res.status(200).json({ data: response.data})
        }catch(err){
            console.log(err)
            res.status(500).json({ error: "Error al crear productos"})
        }
    }
}

export default productsController