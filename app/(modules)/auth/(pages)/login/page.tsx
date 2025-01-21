"use client";


import { Login } from "@/@types/auth";
import { useAuthContext } from "@/app/context/AuthContext";
import { useInputState } from "@/app/hooks/useInputState";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { useParams } from "next/navigation";


const LoginForm = () => {
    const {ownerId} = useParams();
    const [loginRequest, setLoginRequest] = useInputState<Login.LoginRequest>();
    
    const {handleLogin} = useAuthContext();

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh_-_64px_-_108px)]">
            <Card className="min-w-[600px] p-unit-10">
                <CardHeader className="flex justify-center font-bold text-3xl">
                    <div>Iniciar Sesión</div>
                </CardHeader>
                <CardBody className="gap-3">
                    <Input size="sm" type="email" label="Correo" name="email" onValueChange={(value: string) => setLoginRequest({userName: value})} />
                    <Input size="sm" type="password" label="Contraseña" name="password" onValueChange={(value: string) => setLoginRequest({password: value})}/>
                    <Button color="primary" className="mt-4 self-center" onClick={() => handleLogin({...loginRequest, ownerId: ownerId as string })}>Iniciar Sesión</Button>
                </CardBody>
            </Card>
        </div>
    )
}


export default function LoginPage() {

    return (
        <LoginForm/>
    )
}
