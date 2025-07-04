import {productsModel} from "../models/relations.js"

const productsService  = {
    getProducts: async() =>{
        try{
            const productos =  await productsModel.findAll()
            return { success: true, data: productos}
        }catch(err){
            console.error(err);
             return { success: false, message: "Error, intentalo de nuevo"}
        }
    },

    createProduct: async(nombre, precio, estatus ) =>{
        try{
            const newProduct = await productsModel.create({nombre, precio, estatus,})
            return {success: true, data: newProduct}
        }catch(err){
            console.log(err)
            return { success: false, message: "Error, intentalo de nuevo"}
        }

    }
}

export default productsService