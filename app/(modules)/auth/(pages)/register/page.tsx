"use client";


import { Register } from "@/@types/auth";
import { useAuthContext } from "@/app/context/AuthContext";
import { useInputState } from "@/app/hooks/useInputState";
import useLocalStorage from "@/app/hooks/useLocalStorage";

import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterForm = () => {
    const { getValue } = useLocalStorage();

    const [registerRequest, setRegisterRequest] = useInputState<Register.RegisterRequest>();
    const [enableSelect, setEnableSelect] = useState<boolean>(false);

    const { handleRegister } = useAuthContext();

    useEffect(() => {
        const userRole = getValue("role")

        if(!userRole || userRole === "guess") {
            return setRegisterRequest({role: "user"})
        }

        setEnableSelect(true);
    }, [])

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh_-_64px_-_108px)]">
            <Card className="min-w-[600px] p-unit-10">
                <CardHeader className="flex justify-center font-bold text-3xl">
                    <div>Registrarse</div>
                </CardHeader>
                <CardBody className="gap-3">
                    <Input size="sm" type="email" label="Correo" name="email" onValueChange={(value: string) => setRegisterRequest({ mail: value })} />
                    <Input size="sm" type="text" label="Nombre de usuario" name="userName" onValueChange={(value: string) => setRegisterRequest({ userName: value })} />
                    <Input size="sm" type="password" label="Contraseña" name="password" onValueChange={(value: string) => setRegisterRequest({ password: value })} />
                    {enableSelect && <Select
                        size="sm"
                        label="Rol"
                        defaultSelectedKeys={["user"]}
                        placeholder="Selecciona un rol"
                        variant="bordered"
                        onChange={(e) => setRegisterRequest({role: e.target.value})} 
                    >
                        <SelectItem key="user">Usuario</SelectItem>
                        <SelectItem key="admin">Administrador</SelectItem>
                    </Select>}
                    <Button color="primary" className="mt-4 self-center" onClick={() => handleRegister(registerRequest)}>Registrarse</Button>
                </CardBody>
            </Card>
        </div>
    )
}

export default function RegisterPage() {

    return (
        <RegisterForm />
    )
}

