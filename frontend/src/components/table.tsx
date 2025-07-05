import type { Productos } from "../services/productsAPI";

export interface ColumnConfig<T> {
  key?: keyof T;
  label: string;
  className?: string;
  render?: (row: T, estatus?: Productos[]) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columnas: ColumnConfig<T>[];
}

const table = <T extends { idProducto?: number; idHistorial?: number }>({
  data,
  columnas,
}: TableProps<T>) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columnas.map((columna) => (
              <th
                key={String(columna.key) || columna.label}
                className="px-6 py-3 text-center"
              >
                {columna.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {columnas.map((columna) => (
                <td
                  key={String(columna.key) || columna.label}
                  className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-center"
                >
                  {columna.render
                    ? columna.render(row)
                    : (row[columna.key as keyof T] as React.ReactNode) ??
                      "NO DISPONIBLE"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default table;
