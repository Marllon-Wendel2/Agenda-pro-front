// src/app/(auth)/login/page.tsx
"use client";

import { ConfigProvider, theme, Card, Form, Input, Button, Checkbox, Typography, Divider } from "antd";
import Link from "next/link";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { login } from "@/Services/authServices/authServices";
import { LoginDto } from "@/Commons/Types/Auth";

const COLORS = {
  white: "#FFFFFF",          // fundo principal
  grayLight: "#F5F5F5",      // cards / bg secundário
  grayMid: "#E0E0E0",        // bordas
  blueSoft: "#A7C7E7",       // destaques
  greenSoft: "#B8E0D2",      // sucesso / CTAs
  orangeSoft: "#FFD8A8",     // alertas leves
  textDark: "#333333",       // texto principal
};

export default function LoginPage() {

  const handleSubmit = async (loginDto: LoginDto) => {
    console.log("Email:", loginDto.email, "Senha:", loginDto.senha)
    await login(loginDto);
  }
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: COLORS.white,
          colorTextBase: COLORS.textDark,
          colorPrimary: COLORS.blueSoft,
          colorSuccess: COLORS.greenSoft,
          colorBorder: COLORS.grayMid,
          borderRadius: 12,
        },
        components: {
          Button: { colorPrimary: COLORS.greenSoft, colorPrimaryHover: "#a6d8c8" },
          Card: { colorBgContainer: COLORS.grayLight, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" },
          Input: { colorBorder: COLORS.grayMid, colorPrimaryHover: COLORS.blueSoft },
        },
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: COLORS.white,
          padding: "24px",
        }}
      >
        <Card
          style={{ width: 380, border: `1px solid ${COLORS.grayMid}` }}
        >
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <Typography.Title level={3} style={{ margin: 0, color: COLORS.textDark }}>
              Entrar
            </Typography.Title>
            <Typography.Text type="secondary">
              Acesse sua conta para continuar
            </Typography.Text>
          </div>

          <Form layout="vertical" requiredMark={false} onFinish={handleSubmit}>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Informe seu e-mail" },
                { type: "email", message: "E-mail inválido" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="voce@empresa.com" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              rules={[{ required: true, message: "Informe sua senha" }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Lembrar</Checkbox>
              </Form.Item>
              <Link href="/recuperar" style={{ color: COLORS.blueSoft }}>Esqueci minha senha</Link>
            </div>

            <Button type="primary" htmlType="submit" block size="large">
              Entrar
            </Button>
          </Form>

          <Divider style={{ borderColor: COLORS.grayMid }} />

          <div style={{ textAlign: "center" }}>
            <Typography.Text>Não tem conta? </Typography.Text>
            <Link href="/register" style={{ color: COLORS.blueSoft }}>Criar agora</Link>
          </div>
        </Card>
      </main>
    </ConfigProvider>
  );
}
