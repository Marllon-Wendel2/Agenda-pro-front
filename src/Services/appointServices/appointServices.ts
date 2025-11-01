import { AppointmentsDto } from "@/Commons/Types/Appointments";
import mainApi from "../main";

class AppointmentService {
  private baseUrl = '/appointment';

  async getAppointmentByUser(userId: string, token: string) {
    const response = await mainApi.get(`${this.baseUrl}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async getClientByUser(userId: string, token: string) {
    const response = await mainApi.get(`${this.baseUrl}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async createAppointment(data: AppointmentsDto, token: string) {
    const response = await mainApi.post(this.baseUrl, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }

  async deleteAppointment(userId: string, token: string) {
    const response = await mainApi.delete(`${this.baseUrl}/${userId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })

    return response.data;
  }
}

const appointmentService = new AppointmentService();

export default appointmentService;
