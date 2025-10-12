import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@ant-design/v5-patch-for-react-19';
import "./globals.css";
import 'antd/dist/reset.css';
import { ConfigProvider } from "antd";
import { AuthProvider } from "@/Contexts/authContext";
import { ToastContainer } from "react-toastify";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agenda Pro",
  description: "Sistema de agendamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user")?.value;

  let user = null;
    try {
    user = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null;
  } catch (error) {
    console.error("Erro ao ler cookie user:", error);
  }

  // const themeTokens = {
  //   colorText: user?.colors?.text || "#000000",
  //   colorBgTextHover: user?.colors?.highlight || "#D3E3F5",
  // };
  return (
    <AuthProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfigProvider 
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
    <ToastContainer />
    </AuthProvider>
  );
}
