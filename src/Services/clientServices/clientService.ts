import mainApi from "../main";

export async function getClienstsByUser(userId: string, token: string) {
        const response = await mainApi.get(`/client/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
}