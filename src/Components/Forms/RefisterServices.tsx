'use client'

import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Spin
} from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import { ServiceDto } from "@/Commons/Types/Services";
import { createService } from "@/Services/servicesServices/servicesServices";
import { toast } from "react-toastify";

export default function RegisterServices() {  
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const user = JSON.parse(Cookies.get("user") as string);
  const token = Cookies.get('token') as string;

  const onFinish = async (values: ServiceDto) => {
    try {
      setLoading(true);
      console.log("Dados do serviço:", {
        ...values,
        createdBy: user || "desconhecido",
      });

      await createService({ownerId: user.id as string, ...values}, token)
      toast.success('Serviço registrado com sucesso', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true
      })
      form.resetFields();
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
      toast.error('Erro ao criar serviço', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
      })
    } finally {
      setLoading(false);
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
        <Spin size="large" tip="Carregando..." />
      </div>
    );
  }

  return (
    <Row justify="center" style={{ marginTop: "40px" }}>
      <Col xs={24} sm={20} md={12} lg={10}>
        <Card
          title="Cadastro de Serviço"
          bordered={false}
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Form
            form={form}
            name="register-service"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Nome"
              name="name"
              rules={[{ required: true, message: "Por favor insira o nome do serviço!" }]}
            >
              <Input
                prefix={<AppstoreOutlined />}
                placeholder="Ex: Corte Simples"
              />
            </Form.Item>

            <Form.Item
              label="Descrição"
              name="description"
              rules={[{ required: true, message: "Por favor insira a descrição!" }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Ex: Corte de cabelo simples e rápido"
                showCount
                maxLength={150}
              />
            </Form.Item>

            <Form.Item
              label="Duração (minutos)"
              name="duration"
              rules={[
                { required: true, message: "Por favor insira a duração!" },
                { type: "number", min: 1, message: "Informe um valor maior que 0!" },
              ]}
            >
              <InputNumber
                min={1}
                style={{ width: "100%" }}
                placeholder="Ex: 30"
                addonAfter="min"
              />
            </Form.Item>

            <Form.Item
            label="Preço (R$)"
            name="price"
            rules={[
                { required: true, message: "Por favor insira o preço!" },
                { type: "number", min: 1, message: "Informe um valor válido!" },
            ]}
            >
            <InputNumber<string>
            parser={(value) => value ?? ""}
            />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={{ borderRadius: "8px" }}
              >
                {loading ? "Cadastrando..." : "Cadastrar Serviço"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
