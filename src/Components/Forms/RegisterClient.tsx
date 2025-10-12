import { Form, Input, Button, Select, Card, Row, Col, Spin } from "antd";
import { UserOutlined, PhoneOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import Cookies from "js-cookie";
import { ClientDto, ClientFormDto } from "@/Commons/Types/Clients";
import { createClient } from "@/Services/clientServices/clientService";
import { toast } from "react-toastify";

export default function RegisterClient() {
const [form] = Form.useForm()
const [loading, setLoading] = useState(false);

const onFinish = async (values: ClientFormDto) => {
  try {
    setLoading(true)

    const user = JSON.parse(Cookies.get("user")!);
    const token = Cookies.get("token")

    const clientDto: ClientDto = {
      ...values,
      userId: user?.id,
    };

    await createClient(clientDto, token);
    toast.success('Cliente registrado com sucesso.', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true
    });
    setLoading(false)
    form.resetFields(); 
  } catch (err) {
    toast.error('Não foi cadastra o cliente', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true
    });
    console.error(err);
    toast.error("Erro ao registrar cliente");
  }
};

if (loading) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
      <Spin size="large" tip="Carregando..." />
    </div>
  );
}

  return (
    <Row justify="center" style={{ marginTop: "40px" }}>
      <Col xs={24} sm={20} md={12} lg={10}>
        <Card
          title="Cadastro de Cliente"
          bordered={false}
          style={{ borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          <Form
            name="register-client"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Nome"
              name="name"
              rules={[{ required: true, message: "Por favor insira o nome!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Digite o nome do cliente" />
            </Form.Item>

            <Form.Item
              label="Telefone"
              name="phone"
              rules={[{ required: true, message: "Por favor insira o telefone!" }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Ex: (99) 99999-9999" />
            </Form.Item>

            <Form.Item
              label="Plano"
              name="plan"
              rules={[{ required: true, message: "Por favor selecione o plano!" }]}
            >
              <Select
                placeholder="Escolha um plano"
                suffixIcon={<AppstoreOutlined />}
              >
                <Select.Option value="simples">Simples</Select.Option>
                <Select.Option value="plus">Plus</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{ borderRadius: "8px" }}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
