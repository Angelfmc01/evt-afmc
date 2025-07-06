import { useEffect, useState } from "react";
import Table, { type ColumnConfig } from "../components/table";
import { getProductos, type Productos } from "../services/productsAPI";
import { useAuthContext } from "../auth/authConextHook";
import ModalCreateProduct from "../components/modalCreateProduct";
import ModalUpdateProduct from "../components/modalUpdateProduct";

const ProductosPage = () => {
  const [productos, setProductos] = useState<Productos[]>([]);
  const [filtrarProductos, setFiltrarProductos] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Productos | null>(null);

  const { user } = useAuthContext();

  const openModalDialog = (type: string, row?: Productos | null) => {
    setProductoSeleccionado(row || null);
  /*   console.log(productoSeleccionado); */
    setModalType(type);
    setShowModal(true);
  };

  const columnas: ColumnConfig<Productos>[] = [
    {
      key: "idProducto",
      label: "ID",
      className: "w-5",
    },
    {
      key: "nombre",
      label: "NOMBRE",
      className: "",
    },
    {
      key: "precio",
      label: "PRECIO",
      className: "w-7",
    },
    {
      key: "estatus",
      label: "ESTATUS",
      className: "w-10",
    },
    {
      key: "cantidad",
      label: "CANTIDAD",
      className: "w-10 ",
    },
    {
      label: "Acciones",
      className: "w-[300px]",
      render: (row: Productos) => (
        <div className="flex items-center justify-center space-x-7 ">
          {user?.rol === 1 && (
            <button
              onClick={() => openModalDialog("Entrada", row)}
              className="bg-blue-500 text-white-700 hover:bg-blue-300 rounded-md w-20 h-8 flex items-center justify-center text-sm"
            >
              Entrada
            </button>
          )}

          {user?.rol === 2 && (
            <button
              onClick={() => openModalDialog("Salida", row)}
              className="bg-orange-500 text-white-700 hover:bg-orange-300 rounded-md w-20 h-8 flex items-center justify-center text-sm"
            >
              Salida
            </button>
          )}
        </div>
      ),
    },
  ];

  const getAllProductos = async (filtrarProductos: number | null) => {
    try {
      const data = await getProductos(filtrarProductos);
      if (data) {
        setProductos(data);
      }
    } catch (err) {
      console.log("Error al obtener activos", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFiltrarProductos(value === "Todos" ? null : Number(value));
  };

  useEffect(() => {
    getAllProductos(filtrarProductos);
  }, [filtrarProductos]);

  return (
    <div className="m-5 z-10">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => openModalDialog("Create")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-sm"
        >
          Nuevo Producto
        </button>

        <div className="flex items-center">
          <span className="font-medium bg-blue-500 rounded-l-2xl px-4 h-10 flex items-center text-white select-none">
            Filtrar por estado:
          </span>
          <select
            className="border border-blue-300 rounded-r-2xl h-10 px-3 outline-none cursor-pointer"
            onChange={handleChange}
          >
            <option value="Todos">Todos</option>
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table data={productos} columnas={columnas} />
      </div>

      <div className="flex-1 overflow-auto flex flex-col shadow-xl rounded-lg bg-white shadow-slate-300 relative">
        {showModal && modalType === "Create" && (
          <ModalCreateProduct
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onProductCreated={() => {
              setShowModal(false);
              getAllProductos(filtrarProductos);
            }}
          />
        )}

        {showModal && modalType === "Entrada" && (
          <ModalUpdateProduct
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            producto={productoSeleccionado}
            rol={user?.rol}
            movimiento={modalType}
            idUsuario= {user?.idUsuario}
            onProductCreated={() => {
              setShowModal(false);
              getAllProductos(filtrarProductos);
            }}
          />
        )}

        {showModal && modalType === "Salida" && (
          <ModalUpdateProduct
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            producto={productoSeleccionado}
            rol={user?.rol}
            movimiento={modalType}
            idUsuario= {user?.idUsuario}
            onProductCreated={() => {
              setShowModal(false);
              getAllProductos(filtrarProductos);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductosPage;
