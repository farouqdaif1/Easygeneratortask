export interface SignUpFormData {
    email: string;
    name: string;
    password: string;
}

export interface SignInFormData {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
} 