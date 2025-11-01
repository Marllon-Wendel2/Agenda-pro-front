'use client'

import { User } from "@/Commons/Types/User"
import Cookies from "js-cookie";
import { getServicesByClient } from "@/Services/servicesServices/servicesServices"
import { Spin, Table } from "antd"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { ColumnsType } from "antd/es/table";
import { Services } from "@/Commons/Types/Services";

export default function ServicesList() {
    const [services, setServices] = useState([])
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
                const newData = await getServicesByClient(user?.id, token);
                setServices(newData);
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

    const columns: ColumnsType<Services> = [
        {
            title: 'Nome do Serviço',
            dataIndex: 'name',
            align: "center",
        },
        {
            title: 'Descrição',
            align: "center",
            dataIndex: 'description',
        },
        {
            title: 'Preço',
            dataIndex: 'price',
            align: "center",
            render: (price: number) => (
              <span>{price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            ),
        },
    ];
    
    if(loading) {
      <Spin />;
    }
    return(
      <Table dataSource={services} columns={columns} rowKey="id"/>
    )
}