'use client'
import { useEffect, useState } from "react";
import type { Appointments } from "@/Commons/Types/Appointments";
import { Spin, Table } from "antd";
import { getAppointmentByUser } from "@/Services/appointServices/appointServices";
import { useAuth } from "@/Hooks/useAuth";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { User } from "@/Commons/Types/User";

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
        toast.success('Agendamentos carregados com sucesso!', {
          position: 'top-right',
          autoClose: 2000,
          closeOnClick: true
        });
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
      dataIndex: 'client.name',
      key: 'client.name',
    },
    {
      title: 'Serviço',
      dataIndex: 'service.name',
      key: 'service.name'
    }
  ]

    if(loading) {
      <Spin />;
    }
    return(
      <Table dataSource={appointments} columns={columns} />
    )
}