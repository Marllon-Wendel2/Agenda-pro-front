import { LoginDto } from "@/Commons/Types/Auth";
import mainApi from "../main";

export async function login(loginDto: LoginDto) {
    try {
        const response = await mainApi.post('auth', loginDto)

        return response.data;
    } catch (error) {
        console.error(error)
    }
}