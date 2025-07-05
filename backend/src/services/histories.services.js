import {
  historiesModel,
  usersModel,
  productsModel,
} from "../models/relations.js";

const historiesServices = {
  getHistories: async (movimiento = null) => {
    try {
      const filtrar = {};
      if (movimiento !== null) filtrar.movimiento = movimiento;

      const historial = await historiesModel.findAll({
        where: filtrar,
        include: [
          {
            model: productsModel,
            as: "producto",
            attributes: ["nombre"],
          },
          {
            model: usersModel,
            as: "usuario",
            attributes: ["nombre"],
          },
        ],
      });

      const newHistorial = historial.map((item) => ({
        idHistorial: item.idHistorial,
        cantidad: item.cantidad,
        movimiento: item.movimiento,
        fecha: new Date(item.fecha).toLocaleString("es-MX", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        nProducto: item.producto.nombre,
        nUsuario: item.usuario.nombre,
      }));

      return { success: true, data: newHistorial };
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error, intentalo de nuevo" };
    }
  },

  createHistories: async(idUsuario, idProducto, movimiento, cantidad) =>{
    try{
      const newHistory = await historiesModel.create({
        idUsuario,
        idProducto,
        movimiento,
        cantidad
      });
      return { success: true, data: newHistory };
    }catch(err){
      console.log(err)
      return { success: false, message: "Error, intentalo de nuevo"}
    }

  }
};

export default historiesServices;
