'use client'

import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import { getClienstsByUser } from "@/Services/clientServices/clientService";
import { Spin, Table } from "antd";
import { User } from "@/Commons/Types/User";
import { toast } from "react-toastify";
import { ColumnsType } from "antd/es/table";
import { Client } from "@/Commons/Types/Clients";

export function ClientsList() {
    const [clients, setClients] = useState([])
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string>('')
    const [loading, setLoading] = useState(true)

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
            const newData = await getClienstsByUser(user?.id, token);
            setClients(newData);
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

    const columns: ColumnsType<Client> = [
        {
            title: 'Nome do Cliente',
            dataIndex: 'name',
            align: "center",
        },
        {
            title: 'Telefone',
            align: "center",
            dataIndex: 'phone',
        },
        {
            title: 'Total de Agendamentos',
            dataIndex: 'appointment',
            align: "center",
            render: (appointments: []) => appointments.length
        }
    ];

    
    if(loading) {
      <Spin />;
    }
    return(
      <Table dataSource={clients} columns={columns} rowKey="id"/>
    )
}