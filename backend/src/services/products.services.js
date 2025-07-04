import { productsModel } from "../models/relations.js";

const productsService = {
  getProducts: async (estatus= null) => {
    try {
        const filtrar = {}
        if(estatus !== null) filtrar.estatus = estatus
        
      const productos = await productsModel.findAll({where: filtrar});
      return { success: true, data: productos };
    } catch (err) {
      console.error(err);
      return { success: false, message: "Error, intentalo de nuevo" };
    }
  },

  createProduct: async (nombre, precio, estatus) => {
    try {
      const newProduct = await productsModel.create({
        nombre,
        precio,
        estatus,
      });
      return { success: true, data: newProduct };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error, intentalo de nuevo" };
    }
  },

  updateProducts: async (idProducto, datoActualizar) => {
    try {
      const { cantidad, estatus, operacion } = datoActualizar;

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

      if (cantidad !== undefined) {
        if (cantidad < 0) {
          return {
            success: false,
            message: "La cantidad no es valida",
          };
        }

        if (operacion === "sumar") {
          updateData.cantidad = producto.cantidad + cantidad;
        } else if (operacion === "restar") {
          if (producto.cantidad - cantidad < 0) {
            return {
              success: false,
              message: "No hay suficiente inventario",
            };
          }
          updateData.cantidad = producto.cantidad - cantidad;
        } else {
          return {
            success: false,
            message: "Operación no válida",
          };
        }
      }
      if (estatus !== undefined) {
        updateData.estatus = estatus;
      }

      await producto.update(updateData);
     /*  console.log(producto) */
      return {
        message: "Se actualizó correctamente",
      };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error, inténtalo de nuevo" };
    }
  },
};

export default productsService;
