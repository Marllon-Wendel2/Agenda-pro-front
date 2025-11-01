'use client'
import { useEffect, useState } from "react";
import type { Appointments } from "@/Commons/Types/Appointments";
import { Spin, Table } from "antd";
import appointmentService from "@/Services/appointServices/appointServices";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { User } from "@/Commons/Types/User";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";

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
        const newData = await appointmentService.getAppointmentByUser(user?.id, token);
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

const handleDelete = async (appointmentId: string) => {
  try {
    await appointmentService.deleteAppointment(appointmentId, token);
    setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
    toast.success('Agendamento deletado com sucesso!', {
      position: 'top-right',
      autoClose: 2000,
      closeOnClick: true
    });
  } catch (error) {
    toast.error('Não foi possivel deletar o agendamento.', {
      position: 'top-right',
      autoClose: 2000,
      closeOnClick: true
    });
    console.log(error);
  }
};


    const columns: ColumnsType<Appointments> = [
      {
        title: 'Nome do Cliente',
        dataIndex: ['client', 'name'],
        align: "center",
      },
      {
        title: 'Serviço',
        dataIndex: ['service', 'name'],
        key: 'service.name',
        align: "center",
      },
      {
        title: "Horário",
        dataIndex: "hour",
        key: "hour",
        render: (value: string) => dayjs(value).format("DD/MM/YY [às] HH:mm"),
        align: "center",
      },
      {
        title: 'Editar / Deletar',
        dataIndex: 'actions',
        key: 'actions',
        align: 'center',
        render: (data, record) => (
        <>
          <DeleteOutlined style={{ color: 'red', cursor: 'pointer', marginRight: 8 }} onClick={() => handleDelete(record.id)}/>
          <EditOutlined style={{ color: 'blue', cursor: 'pointer' }} />
        </>
      ),
      }
    ];

    if(loading) {
      <Spin />;
    }
    return(
      <Table dataSource={appointments} columns={columns} rowKey="id"/>
    )
}
