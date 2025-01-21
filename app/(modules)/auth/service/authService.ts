import { Login, Register } from "@/@types/auth";
import { useUserConfig } from "@/app/context/UserConfigContext";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import usePersisentState from "@/app/hooks/usePersistentState";
import { createApiGatewayApiInstance } from "@/app/lib/serverCalls";
import axios from "axios";




export default function AuthService() {
    const { endpoint } = useUserConfig();

    const { getValue } = useLocalStorage();
    const authApiGatewayInstance = createApiGatewayApiInstance( endpoint as string + "auth/");

    const getOwnerId = () => {
        const createdConfig = getValue("creationConfig");
        return JSON.parse(createdConfig as string).userId;
    }

    const login = async (loginRequest: Login.LoginRequest) => {
        const response = await authApiGatewayInstance.post('/login', {...loginRequest, ownerId: getOwnerId()});
        return response.data;
    }
    
    const register = async (registerRequest: Register.RegisterRequest) => {
        const response = await authApiGatewayInstance.post('/register', {...registerRequest, ownerId: getOwnerId()});
        return response.data;
    }
    return {
        login,
        register,
    }
}