import { ClientDto } from "@/Commons/Types/Clients";
import mainApi from "../main";

export async function getClienstsByUser(userId: string, token: string) {
        const response = await mainApi.get(`/client/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
}

export async function createClient(data: ClientDto, token?: string) {
  const response = await mainApi.post("/client", data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return response.data;
}