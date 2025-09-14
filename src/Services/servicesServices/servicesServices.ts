import mainApi from "../main";

export async function getServicesByClient(userId: string, token: string) {
        const response = await mainApi.get(`/services/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
}