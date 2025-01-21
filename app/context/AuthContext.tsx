import { Login, Register } from "@/@types/auth";
import { createContext, useContext, useState } from "react";
import useDidMountEffect from "../hooks/useDidMountEffect";
import usePersisentState from "../hooks/usePersistentState";
import AuthService from "../(modules)/auth/service/authService";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import useNotification from "../hooks/useNotification";

type AuthContextType = {
    handleLogin: (loginRequest: Login.LoginRequest) => void;
    handleRegister: (registerRequest: Register.RegisterRequest) => void;
    handleVerify: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuthContext() {
    return useContext(AuthContext);
}

const requieredAuthPaths = [
    "/main"
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { login, register } = AuthService();
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [token, setToken, clearToken] = usePersisentState("token");
    const [role, setRole] = usePersisentState("token");
    const { showErrorAlert, showSuccessAlert } = useNotification();

    const params = useSearchParams();

    const pathname = usePathname();
    const router = useRouter()


    const authorize = (token: string, role: string) => {
        setToken(token);
        setRole(role);
        setIsAuthorized(true);
    }

    const unauthorize = () => {
        showErrorAlert("Sesión terminada");
        setIsAuthorized(false);
        clearToken();
        router.push("/auth/login");
    }

    const handleLogin = (loginRequest: Login.LoginRequest) => {
        login(loginRequest).then((loginResponse) => {
            authorize(loginResponse.token, loginResponse.token);
            router.push("/main");
        }).catch(err => {
            showErrorAlert("Credenciales invalidas");
        })
    }

    const handleRegister = (registerRequest: Register.RegisterRequest) => {
        register(registerRequest).then((registerResponse) => {
            showSuccessAlert("Se ha enviado un correo de confirmación");
        }).catch(err => {
            showErrorAlert("Correo ya en uso");
        })
    }

    const handleVerify = () => {
        const token = params.get("token");
        const userId = params.get("id");

        if (!token || !userId) {
            showSuccessAlert("Error al validar, registrate nuevamente");
            return router.push("/auth/register");
        }
    }

    useDidMountEffect(() => {
        if (!requieredAuthPaths.includes(pathname)) return;

        if (!token) return unauthorize();

    }, [])

    return (
        <AuthContext.Provider value={{ handleLogin, handleRegister, handleVerify }}>
            {children}
        </AuthContext.Provider>
    )
}