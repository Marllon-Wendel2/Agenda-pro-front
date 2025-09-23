export interface Services {
    id: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    avaible: boolean;
    owner: {
        id: string;
        nome:string;
    }
}

export interface ServiceDto {
    name: string;
    description: string;
    duration: number;
    price: number;
    ownerId?: string;
}