export namespace Login {
    type LoginRequest =  {
        userName: string;
        password: string;
        ownerId: string;
    }

    type LoginResponse = {

    } & AuthResponse
}

export namespace Register {
    type RegisterRequest = {
        mail: string;
        userName: string;
        password: string;
        ownerId: string;
        role: string;
    }

    type RegisterResponse = {

    } & AuthResponse

    type VerifyRequest = {
        token: string;
        userId: string;
    }
}


type AuthResponse = {
    token: string;
    role: string;
}

export namespace Authorization {
    type TokenPayload = {
        token: string
    }
}


