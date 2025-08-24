import { Appointments } from "./Appointments";

export interface Client {
    id: number;
    name: string;
    phone: string;
    appointment: Appointments[];
}