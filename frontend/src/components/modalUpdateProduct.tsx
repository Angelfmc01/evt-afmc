import { useEffect, useState } from "react";
import {
  updateProductos,
  type Productos,
  type UpdateProductos,
} from "../services/productsAPI";

interface ModalCreateProductProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (success: boolean, message: string) => void;
  producto?: Productos | null;
  rol?: number;
  idUsuario?: number;
  movimiento: string;
}

const ModalUpdateProduct = ({
  isOpen,
  onClose,
  onProductCreated,
  producto,
  rol,
  idUsuario,
  movimiento,
}: ModalCreateProductProps) => {
  const [estatusActual, setEstatusActual] = useState(0);

  const [productoSeleccionado, setProductoSeleccionado] = useState({
    idProducto: producto?.idProducto,
    nombre: producto?.nombre || "",
    precio: producto?.precio || 0,
    cantidad: producto?.cantidad || 0,
    estatus: producto?.estatus,
  });

  useEffect(() => {
    if (producto) {
      setProductoSeleccionado(producto);
      setEstatusActual(producto?.estatus);
    }
  }, [producto]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductoSeleccionado((prev) => ({
      ...prev,
      [name]: name === "estatus" ? Number(value) : value,
    }));
  };

  const handleIncrement = () => {
    setProductoSeleccionado((prev) => {
      if (rol === 2 && producto) {
        if (prev.cantidad >= producto.cantidad) {
          return prev;
        }
      }

      return {
        ...prev,
        cantidad: prev.cantidad + 1,
      };
    });
  };

  const handleDecrement = () => {
    setProductoSeleccionado((prev) => {
      if (rol === 1 && producto) {
        if (prev.cantidad <= producto.cantidad) {
          return prev;
        }
      } else if (rol === 2) {
        if (prev.cantidad <= 0) {
          return prev;
        }
      }

      return {
        ...prev,
        cantidad: prev.cantidad - 1,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const datosProducto: UpdateProductos = {
        idUsuario: idUsuario!,
        idProducto: productoSeleccionado.idProducto!,
        cantidad: productoSeleccionado.cantidad,
        estatus: productoSeleccionado.estatus!,
        movimiento: movimiento,
      };
      const response = await updateProductos(datosProducto);
 
      if (!response?.success) {
        onProductCreated(false, "Error al acualizar");
        return;
      }
      onProductCreated(response.success, "Producto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-gray-900/70 z-20">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {rol === 1 ? `Entrada productos` : `Salida productos`}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  disabled
                  value={productoSeleccionado.nombre}
                  className="bg-gray-600 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>

              {rol === 1 && (
                <>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Estatus actual
                    </label>
                    <input
                      id="estatus"
                      name="estatus"
                      value={estatusActual}
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    ></input>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Nuevo estatus
                    </label>
                    <select
                      id="estatus"
                      name="estatus"
                      value={String(productoSeleccionado.estatus)}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    >
                      <option value="">Seleccionar estatus</option>
                      <option value={1}>Activo</option>
                      <option value={0}>Inactivo</option>
                    </select>
                  </div>
                </>
              )}

              <div className="col-span-2  ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Cantidad
                </label>
                <div className="flex  items-center justify-center ">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className={`w-10 h-10 px-3 py-1 text-white rounded-l-lg ${
                      rol === 1 &&
                      productoSeleccionado.cantidad <= (producto?.cantidad || 0)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    disabled={
                      rol === 1 &&
                      productoSeleccionado.cantidad <= (producto?.cantidad || 0)
                    }
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  <input
                    type="number"
                    name="cantidad"
                    id="cantidad"
                    value={`${productoSeleccionado.cantidad}`}
                    onChange={(e) =>
                      setProductoSeleccionado((prev) => ({
                        ...prev,
                        cantidad: Number(e.target.value),
                      }))
                    }
                    className="w-20 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    min="0"
                  />
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className={`w-10 h-10 px-3 py-1 text-white rounded-r-lg ${
                      rol === 2 &&
                      productoSeleccionado.cantidad >= (producto?.cantidad || 0)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    disabled={
                      rol === 2 &&
                      productoSeleccionado.cantidad >= (producto?.cantidad || 0)
                    }
                  >
                    <svg
                      className=" w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateProduct;
