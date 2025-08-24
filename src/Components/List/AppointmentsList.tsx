'use client'
import { useEffect, useState } from "react";
import type { Appointments } from "@/Commons/Types/Appointments";
import { Table } from "antd";
import { getAppointmentByUser } from "@/Services/appointServices/appointServices";

export default function AppointmentsList (){
const [appointments, setAppointments] = useState<Appointments[]>([]);

useEffect(()=> {
  handleFetchAppointments()
}, [])

const handleFetchAppointments = async () => {
    try {
    const newData =  await getAppointmentByUser('58f28f8c-60c6-4908-bac7-160672348329')
    setAppointments(newData)
  } catch (error) {
    console.log(error)
  }
}


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
    return(
      <Table dataSource={appointments} columns={columns} />
    )
}