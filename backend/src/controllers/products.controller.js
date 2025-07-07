import productsService from "../services/products.services.js";

const productsController = {
  getProducts: async (req, res) => {
    try {
      const { estatus } = req.query;
      const response = await productsService.getProducts(estatus);
      if (!response.success)
        return res.status(401).json({ error: response.message });

      return res.status(200).json({ data: response.data });
    } catch (err) {
      res.status(500).json({ error: "Error al obtener los productos" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const { nombre, precio, estatus } = req.body;
      const response = await productsService.createProduct(
        nombre,
        precio,
        estatus
      );
      if (!response.success) return res.status(401).json({ success: false });

      return res
        .status(200)
        .json({
          success: true,
          data: response.data,
          message: response.message,
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error al crear productos" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { idProducto, ...datoActualizar } = req.body;

      const response = await productsService.updateProducts(
        idProducto,
        datoActualizar
      );

      if (!response.success)
        return res.status(401).json({ message: response.message, success: false });
  

      return res
        .status(200)
        .json({
          message: "Cantidad actualizada correctamente",
          data: response.actualizado,
          success: true
        });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Error al actualizar productos" });
    }
  },
};

export default productsController;
