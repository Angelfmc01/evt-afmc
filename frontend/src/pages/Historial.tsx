import { useEffect, useState } from "react";
import Table, { type ColumnConfig } from "../components/table";
import { getHistoriales, type Historial } from "../services/historiesAPI";

const HistorialPage = () => {
  const [historiales, setHistoriales] = useState<Historial[]>([]);
  const [filtrarHistorial, setFiltrarHistorial] = useState<string | null>(null);

  const columnas: ColumnConfig<Historial>[] = [
    {
      key: "idHistorial",
      label: "ID",
      className: "w-5",
    },
    {
      key: "nUsuario",
      label: "USUARIO",
    },
    {
      key: "nProducto",
      label: "PRODUCTO",
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

  const getAllHistoriales = async (filtro: string | null) => {
    try {
      const data = await getHistoriales(filtro);
      if (data) {
        setHistoriales(data);
      }
    } catch (err) {
      console.log("Error al obtener historial", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFiltrarHistorial(value === "Todos" ? null : value);
  };

  useEffect(() => {
    getAllHistoriales(filtrarHistorial);
  }, [filtrarHistorial]);

  return (
    <div className="m-5 z-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium bg-blue-500 rounded-l-2xl px-4 h-10 flex items-center text-white select-none">
            Filtrar por estado:
          </span>
          <select
            className="border border-blue-300 rounded-r-2xl h-10 px-3 outline-none cursor-pointer"
            onChange={handleChange}
          >
            <option value="Todos">Todos</option>
            <option value="Entrada">Entrada</option>
            <option value="Salida">Salida</option>
          </select>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table data={historiales} columnas={columnas} />
      </div>
    </div>
  );
};

export default HistorialPage;
