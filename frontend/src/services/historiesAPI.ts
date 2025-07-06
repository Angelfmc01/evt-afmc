import { makeRequest } from "./makeRequest";

export interface Historial {
  idHistorial: number;
  nUsuario: string;
  nProducto: string;
  movimiento: "Entrada" | "Salida";
  fecha: Date;
  cantidad: number;
}

interface ApiResponse {
  data: Historial[];
}

export const getHistoriales = async (movimiento: string | null = null) => {
  try {
    let endpoint = `histories/get?`;
    if (movimiento === "Entrada" || movimiento === "Salida") endpoint += `movimiento=${movimiento}`;
    
    const historales = await makeRequest<ApiResponse, undefined>(
      endpoint,
      "GET"
    );
    return historales.data;
  } catch (err) {
    console.log("Error al obtener los historiales", err);
  }
};
