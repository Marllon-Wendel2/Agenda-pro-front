'use client'

import { Layout, Menu, MenuProps, Drawer, Button } from "antd";
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import AppointmentsList from "../Components/List/AppointmentsList";
import PrivateRoute from "@/Components/PrivateRoute";
import { ClientsList } from "@/Components/List/ClientsList";
import ServicesList from "@/Components/List/ServicesList";
import RegisterClient from "@/Components/Forms/RegisterClient";
import RegisterServices from "@/Components/Forms/RefisterServices";

export default function Home() {
  const [selected, setSelected] = useState("Agendamentos");
  const [mobile, setMobile] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items2: MenuProps['items'] = [UserOutlined].flatMap(
    (icon, index) => {
      const key = String(index + 1);

      return [
        {
          key: `sub${key}`,
          icon: React.createElement(icon),
          label: `Listas`,
          children: [
            { key: `Agendamentos`, label: 'Agendamentos' },
            { key: `Clientes`, label: 'Clientes' },
            { key: `Serviços`, label: 'Serviços' },
          ]
        },
        {
          key: `sub${key}2`,
          icon: React.createElement(icon),
          label: `Cadastrar`,
          children: [
            { key: `cadastrarAgendamentos`, label: 'Agendamentos' },
            { key: `cadastrarClientes`, label: 'Clientes' },
            { key: `cadastrarServiços`, label: 'Serviços' },
          ]
        },
      ];
    }
  );

  const renderContent = () => {
    switch (selected) {
      case "Agendamentos":
        return <AppointmentsList />;
      case "Clientes":
        return <ClientsList />;
      case "Serviços":
        return <ServicesList />;
      case "cadastrarClientes":
        return <RegisterClient/>
      case 'cadastrarServiços':
        return <RegisterServices/>
      default:
        return <AppointmentsList />;
    }
  };

  const menu = (
    <Menu
      mode="inline"
      defaultSelectedKeys={['Agendamentos']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', background: '#A7C7E7', borderRight: 0 }}
      items={items2}
      onClick={(e) => {
        setSelected(e.key);
        if (mobile) setDrawerOpen(false);
      }}
    />
  );

  return (
    <PrivateRoute>
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '0 16px',
          }}
        >
          <Image
            src="/AgendaPro.png"
            alt="Agenda Pro Logo"
            width={120}
            height={80}
          />
          {mobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
            />
          )}
        </Header>

        <Layout>
          {!mobile ? (
            <Sider
              style={{
                background: '#A7C7E7',
                minHeight: 'calc(100vh - 64px)',
                boxShadow: '2px 0 5px rgba(0,0,0,0.05)',
              }}
              width={200}
            >
              {menu}
            </Sider>
          ) : (
            <Drawer
              placement="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              style={{ padding: 0, background: '#A7C7E7' }}
            >
              {menu}
            </Drawer>
          )}

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
              {renderContent()}
            </div>
          </Layout>
        </Layout>
      </Layout>
    </PrivateRoute>
  );
}
