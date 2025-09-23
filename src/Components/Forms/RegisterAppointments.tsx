'user client'

import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  Spin
} from "antd";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { Client } from "@/Commons/Types/Clients";
import { Services } from "@/Commons/Types/Services";
import { useEffect, useState } from "react";
import { AppointmentsDto } from "@/Commons/Types/Appointments";
import { getClienstsByUser } from "@/Services/clientServices/clientService";
import { getServicesByClient } from "@/Services/servicesServices/servicesServices";
import { createAppointment } from "@/Services/appointServices/appointServices";
import { toast } from "react-toastify";


export default function RegisterAppointmentForm() {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [services, setServices] = useState<Services[] | null>(null)
    const [clients, setClients] = useState<Client[] | null>(null)

    const user = JSON.parse(Cookies.get("user") as string);
    const token = Cookies.get("token") as string;

    const hanndleClients = async () => {
        getClienstsByUser(user.id, token).then((response) => {
            setClients(response)
        })
    }

    const hanndleServices = async () => {
        getServicesByClient(user.id, token).then((response) => {
            console.log(response)
            setServices(response)
        })
    }

    useEffect(() => {
        hanndleClients()
        hanndleServices()
    }, [])

    const onFinish = async (values: AppointmentsDto) => {
        try {
            setLoading(true);

            const dto: AppointmentsDto = {
                user: user.id, 
                client: values.client,
                service: values.service,
                hour: values.hour,
            };

            createAppointment(dto, token)
            toast.success("Agendamento realizado com sucesso!", {
                position: 'top-right',
                closeOnClick: true,
                autoClose: 2000,
            })
            setLoading(false)
        } catch (error) {
            console.error(error)
            toast.error("Agendamento não realizado!", {
                position: 'top-right',
                closeOnClick: true,
                autoClose: 2000,
            })
        }
    };

    if (loading) {
    return (
        <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
        }}
        >
        <Spin size="large" tip="Cadastrando..." />
        </div>
    );
    }

    return (
    <Row justify="center" style={{ marginTop: "40px" }}>
        <Col xs={24} sm={20} md={12} lg={10}>
        <Card
            title="Cadastrar Agendamento"
            bordered={false}
            style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        >
            <Form
            form={form}
            name="register-appointment"
            layout="vertical"
            onFinish={onFinish}
            >

            <Form.Item
                label="Cliente"
                name="client"
                rules={[{ required: true, message: "Selecione um cliente!" }]}
            >
                <Select placeholder="Escolha o cliente">
                {clients?.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                    {c.name}
                    </Select.Option>
                ))}
                </Select>
            </Form.Item>

            {/* Serviço */}
            <Form.Item
                label="Serviço"
                name="service"
                rules={[{ required: true, message: "Selecione um serviço!" }]}
            >
                <Select placeholder="Escolha o serviço">
                {services?.map((s) => (
                    <Select.Option key={s.id} value={s.id}>
                    {s.name}
                    </Select.Option>
                ))}
                </Select>
            </Form.Item>

            {/* Data e Hora */}
            <Form.Item
                label="Data e Hora"
                name="hour"
                rules={[{ required: true, message: "Selecione a data e hora!" }]}
            >
                <DatePicker
                showTime
                style={{ width: "100%" }}
                format="YYYY-MM-DD HH:mm"
                disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                }
                />
            </Form.Item>

            {/* Botão */}
            <Form.Item>
                <Button
                type="primary"
                htmlType="submit"
                block
                style={{ borderRadius: "8px" }}
                >
                Cadastrar Agendamento
                </Button>
            </Form.Item>
            </Form>
        </Card>
        </Col>
    </Row>
    );
}