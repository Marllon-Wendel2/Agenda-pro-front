'use client'
import { useEffect, useState } from "react";
import type { Appointments } from "@/Commons/Types/Appointments";
import { Spin, Table } from "antd";
import { getAppointmentByUser } from "@/Services/appointServices/appointServices";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { User } from "@/Commons/Types/User";
import dayjs from "dayjs";

export default function AppointmentsList (){
const [appointments, setAppointments] = useState<Appointments[]>([]);
const [loading, setLoading] = useState(true)
const [user, setUser] = useState<User | null>(null)
const [token, setToken] = useState<string>('')

useEffect(() => {
      const newToken = Cookies.get('token')
      const newUser = Cookies.get('user')

      if(newToken && newUser) {
        setUser(JSON.parse(newUser));
        setToken(newToken ?? '')
      }
}, [])

useEffect(() => {
  const handleFetchAppointments = async () => {
    try {
      if (user) {
        const newData = await getAppointmentByUser(user?.id, token);
        setAppointments(newData);
        setLoading(false);
      }
    } catch (error) {
      toast.error('Não foi possivel carregar os agendamentos.', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true
      });
      console.log(error);
    }
  };

  handleFetchAppointments();
}, [user, token]);


    const columns = [
      {
        title: 'Nome do Cliente',
        dataIndex: ['client', 'name'],
      },
      {
        title: 'Serviço',
        dataIndex: ['service', 'name'],
        key: 'service.name',
      },
      {
        title: "Horário",
        dataIndex: "hour",
        key: "hour",
        render: (value: string) => dayjs(value).format("DD/MM/YY [às] HH:mm"),
      },
    ];

    if(loading) {
      <Spin />;
    }
    return(
      <Table dataSource={appointments} columns={columns} />
    )
}
