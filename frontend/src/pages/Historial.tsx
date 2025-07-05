import { useEffect, useState } from "react";
import Table, {type ColumnConfig } from "../components/table";
import { getHistoriales, type Historial } from "../services/historiesAPI";

const Historial = () => {
  const [historiales, setHistoriales] = useState<Historial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const columnas: ColumnConfig<Historial>[] = [
    {
      key: "idHistorial",
      label: "ID HISTORIAL",
    },
    {
      key: "nUsuario",
      label: "ID USUARIO",
    },
    {
      key: "nProducto",
      label: "ID PRODUCTO",
    },
    {
      key: "movimiento",
      label: "MOVIMIENTO",
    },
    {
      key: "fecha",
      label: "FECHA",
    },
    {
      key: "cantidad",
      label: "CANTIDAD",
    },
  ];

  const getAllHistoriales = async () => {
    setLoading(true);
    try {
      const data = await getHistoriales();
      if (data) {
        setHistoriales(data);
      }
    } catch (err) {
      console.log("Error al obtener historial", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllHistoriales();
  }, []);

  useEffect(() => {
    console.log("Historiales actualizados:", historiales);
    console.log(loading)
  }, [historiales, loading]);

  return (
    <div className="m-5 bg-amber-200">
      <div>
        <Table data={historiales} columnas={columnas} />
      </div>
    </div>
  );
};

export default Historial;
