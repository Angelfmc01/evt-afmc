import { makeRequest } from "./makeRequest";

export interface Productos {
    idProducto: number;
    nombre: string;
    precio: number;
    estatus: number
    cantidad: number;
}

interface ApiResponse {
    data: Productos[]
}

export const getProductos = async(estatus= null) =>{
    try{
        let endpoint = `products/get`
        if(estatus){
            endpoint += `?estatus=${estatus}`
        }

        const productos = await makeRequest<ApiResponse, undefined>(endpoint, "GET")
        return productos.data
    }catch(err){
        console.log("Error al obtener los productos", err)
    }
}