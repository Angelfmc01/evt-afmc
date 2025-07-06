import { makeRequest } from "./makeRequest";

type LoginData = {
    correo: string;
    contrasena: string;
}

export const loginUser = async(data: LoginData) => {
    try {
        const endpoint = `auth/login`;
        const response = await makeRequest<{
            success: boolean; 
            token?: string; 
            message?: string, 
            user?: {
                nombre: string;
                rol: number;
                correo: string;
            }
        }, LoginData>(endpoint, "POST", data, "json");
     
        if (!response.token || !response.user) {
            return { success: false, message: response.message || "Error en la solicitud" };
        }
        
        return { 
            success: true, 
            token: response.token, 
            user: response.user 
        };
    } catch(err) {
        console.log("Error al iniciar sesión", err);
        return { success: false, message: "Error en la conexión" };
    }
};