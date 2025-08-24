import mainApi from "../main";

export async function getAppointmentByUser(userId: string) {
    const response = await mainApi.get(`/appointment/${userId}`)

    return response.data
}