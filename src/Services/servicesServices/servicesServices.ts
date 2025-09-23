import { ServiceDto } from "@/Commons/Types/Services";
import mainApi from "../main";


export async function getServicesByClient(userId: string, token: string) {
        const response = await mainApi.get(`/services/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
}

export async function  createService(data:ServiceDto, token: string) {
    const response = await mainApi.post('/services', data, {
        headers: { Authorization: `Bearer ${token}`}
    })

    return response
    
}