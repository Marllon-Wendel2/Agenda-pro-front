import { Appointments } from "./Appointments";

export interface Client {
    id: number;
    name: string;
    phone: string;
    appointment: Appointments[];
}

export interface ClientFormDto {
  name: string;
  phone: string;
  plan: string;
}

export interface ClientDto extends ClientFormDto {
  user: string;
}