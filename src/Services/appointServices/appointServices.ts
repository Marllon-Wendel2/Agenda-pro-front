import mainApi from "../main";

export async function getAppointmentByUser(userId: string, token: string) {
    const response = await mainApi.get(`/appointment/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
}