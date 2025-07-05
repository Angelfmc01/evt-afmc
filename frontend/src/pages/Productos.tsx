import { useEffect, useState } from "react";
import Table, {type ColumnConfig} from "../components/table";
import { getProductos, type Productos } from "../services/productsAPI";

const Productos = () => {
  const [productos, setProductos] = useState<Productos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columnas: ColumnConfig<Productos>[] = [
    {
      key: "idProducto",
      label: "ID",
      className: "",
    },
    {
      key: "nombre",
      label: "NOMBRE",
      className: "",
    },
    {
      key: "precio",
      label: "PRECIO",
      className: "",
    },
    {
      key: "estatus",
      label: "ESTATUS",
      className: "",
    },
    {
      key: "cantidad",
      label: "CANTIDAD",
      className: "",
    },
    {
      label: "Acciones",
      className: "",
    },
  ];

  const getAllProductos = async () => {
    setLoading(true);
    try {
      const data = await getProductos();
      if (data) {
        setProductos(data);
      }
    } catch (err) {
      console.log("Error al obtener activos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductos();
  }, []);

  useEffect(() => {
    console.log("Productos actualizados:", productos);
    console.log(loading)
  }, [productos, loading]);

  return (
    <div className="m-5 bg-amber-200">
      <div>
        <Table data={productos} columnas={columnas} />
      </div>
    </div>
  );
};

export default Productos;
