import { makeRequest } from "./makeRequest";

export interface Productos {
  idProducto: number;
  nombre: string;
  precio: number;
  estatus: number;
  cantidad: number;
}

export interface NewProductos {
  nombre: string;
  precio: number;
  estatus: number;
  cantidad: number;
}

export interface UpdateProductos {
  idUsuario: number
  idProducto: number;
  estatus: number;
  cantidad: number;
  movimiento: string
}

interface ApiResponse {
  data: Productos[];
}

export const getProductos = async (estatus: number | null = null) => {
  try {
    let endpoint = `products/get?`;
    if (estatus === 0 || estatus === 1) {
      endpoint += `estatus=${estatus}`;
    }

    const productos = await makeRequest<ApiResponse, undefined>(
      endpoint,
      "GET"
    );
    return productos.data;
  } catch (err) {
    console.log("Error al obtener los productos", err);
  }
};

export const createProductos = async (newProducto: NewProductos) => {
  try {
    const endpoint = `products/create`;
    const response = await makeRequest<ApiResponse, NewProductos>(
      endpoint,
      "POST",
      newProducto
    );
    return response.data;
  } catch (err) {
    console.log("Error al crear el activo", err);
  }
};

export const updateProductos = async (updateProducto: UpdateProductos) => {
  try {
    const endpoint = `products/update`;
    const response = await makeRequest<ApiResponse, UpdateProductos>(
      endpoint,
      "POST",
      updateProducto
    );
    return response.data;
  } catch (err) {
    console.log("Error al crear el activo", err);
  }
};
