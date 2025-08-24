import { Breadcrumb, Layout, Menu, MenuProps } from "antd";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Image from 'next/image';
import React from "react";
import Appointments from "./components/Agendamentos/Appointments";

export default function Home() {

  const items2: MenuProps['items'] = [UserOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `Serviços`,
      children: [
        {
          key:`Agendamentos`,
          label: 'Agendamentos',
        },
        {
          key:`Clientes`,
          label: 'Clientes',
        },
        {
          key:`Serviços`,
          label: 'Serviços',
        },
      ]
    };
  },
);
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '0 24px',
      }}
    >
      <Image
        src="/AgendaPro.png"
        alt="Agenda Pro Logo"
        width={150}
        height={100}
      />
    </Header>
     <Layout>
      {/* MENU LATERAL */}
      <Sider
        style={{
          background: '#A7C7E7',
          minHeight: 'calc(100vh - 64px)',
          boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
        }}
        width={200}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', background: '#A7C7E7', borderRight: 0 }}
          items={items2}
        />
      </Sider>

      {/* ÁREA PRINCIPAL */}
      <Layout style={{ padding: '10px 24px' }}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          }}
        >
          <Appointments />
        </div>
      </Layout>
    </Layout>
    </Layout>
  );
}