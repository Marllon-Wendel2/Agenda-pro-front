import { Client } from "./Clients";
import { Services } from "./Services";

export interface Appointments {
    id: string;
    hour: string;
    createdAt: string;
    service: Services;
    client: Client;
}