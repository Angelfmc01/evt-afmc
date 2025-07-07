import { productsModel } from "../models/relations.js";
import historiesServices from "./histories.services.js";

const productsService = {
  getProducts: async (estatus = null) => {
    try {
      const filtrar = {};
      if (estatus !== null) filtrar.estatus = estatus;

      const productos = await productsModel.findAll({ where: filtrar , order: [['idProducto', 'DESC']], });

      const newProducto = productos.map((item) => ({
        idProducto: item.idProducto,
        nombre: item.nombre,
        precio: Number(item.precio).toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        estatus: item.estatus === 1 ? "Activo" : "Inactivo",
        cantidad: item.cantidad,
      }));

      return { success: true, data: newProducto };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error, intentalo de nuevo" };
    }
  },

  createProduct: async (nombre, precio, estatus) => {
    try {
      if(!nombre || !precio || !estatus) return { success: false};
      const newProduct = await productsModel.create({
        nombre,
        precio,
        estatus,
      });
      return { success: true, data: newProduct, message: "Producto creado correctamente" };
    } catch (err) {
      return { success: false, message: "Error, intentalo de nuevo" };
    }
  },

  updateProducts: async (idProducto, datoActualizar) => {
  try {
    const { cantidad, estatus, movimiento, idUsuario } = datoActualizar;

    const producto = await productsModel.findByPk(idProducto);
    if (!producto)
      return { success: false, message: "No se encontró el producto" };

    if (cantidad === undefined && estatus === undefined) {
      return {
        success: false,
        message: "Debe enviar cantidad o estatus para actualizar",
      };
    }

    const updateData = {};
    let diferencia = 0; 

    if (cantidad !== undefined) {
      if (cantidad < 0) {
        return {
          success: false,
          message: "La cantidad no es válida",
        };
      }
      diferencia = Math.abs(producto.cantidad - cantidad); 
      updateData.cantidad = cantidad;
    }

    if (estatus !== undefined) {
      updateData.estatus = estatus;
    }

    const actualizado = await producto.update(updateData);

    if (actualizado) {
      if (movimiento && cantidad !== undefined) {
        await historiesServices.createHistories(
          idUsuario,
          idProducto,
          movimiento,
          diferencia 
        );
      }
    }

    return {
      success: true, 
      message: "Se actualizó correctamente",
    };
  } catch (err) {
    console.log(err);
    return { success: false, message: "Error, inténtalo de nuevo" };
  }
},
};

export default productsService;
