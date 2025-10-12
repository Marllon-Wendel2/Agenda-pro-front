export interface User{
    nome: string;
    email: string;
    type: string;
    id: string;
    logoUrl: string;
    colors: {
        primary: string;
        highlight: string;
        secondary: string;
        text: string;
    }
}