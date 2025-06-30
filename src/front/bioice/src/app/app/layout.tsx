"use client";

import { useEffect, useState } from "react"
import {
  Home,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import NavBarButton from "@/components/basic/NavBarButton"
import { useRouter, usePathname } from "next/navigation"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { name: "Home", icon: <Home size={18} />, href: "/app/dashboard" },
    { name: "Lançamentos", icon: <FileText size={18} />, href: "/app/entries" },
    { name: "Funcionários", icon: <Users size={18} />, href: "/app/employee" },
    { name: "Configurações", icon: <Settings size={18} />, href: "/app/config" },
    { name: "Sair", icon: <LogOut size={18} />, href: "/" },
  ];

  useEffect(() => {
    if (pathname.includes("app")) {
      const uri = pathname.split("/")
      switch (uri[2]) {
        case "dashboard":
          setActive("Home")
          break
        case "entries":
          setActive("Lançamentos")
          break
        case "employee":
          setActive("Funcionários")
          break
        case "config":
          setActive("Configurações")
          break
      }
    }
  }, [pathname])

  return <div className="flex relative h-screen bg-gray-100">
    {/* Sidebar */}
    <div className="w-64 bg-white border-r border-gray-300 shadow-sm flex flex-col px-4 py-6">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="text-xl font-bold text-green-600 text-center">🌱 Biolce</div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col mt-6 gap-1">
        {menuItems.map((item) => (
          <NavBarButton
            key={item.name}
            icon={item.icon}
            label={item.name}
            onClick={() => {
              setActive(item.name);
              router.push(item.href);
            }}
            active={active === item.name}
          />
        ))}
      </nav>
    </div>

    <main className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</main>
  </div>
}
