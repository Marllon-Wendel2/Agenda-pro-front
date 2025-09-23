import { AppointmentsDto } from "@/Commons/Types/Appointments";
import mainApi from "../main";

export async function getAppointmentByUser(userId: string, token: string) {
    const response = await mainApi.get(`/appointment/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
}

export async function getClientByUser(userId: string, token: string) {
    const response = await mainApi.get(`/appointment/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
}

export async function createAppointment(data:AppointmentsDto, token: string) {
    const response = await mainApi.post('/appointment', data ,{
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
}