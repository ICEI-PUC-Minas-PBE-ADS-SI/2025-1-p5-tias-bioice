"use client";

import Card from "@/components/basic/Card";
import { useAppContext } from "@/contexts/AppContext";
import { useContext, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const verde = "#00C49F";
const amarelo = "#FFBB28";
const cinzaClaro = "#E0E0E0";

const dataDesempenho = [
  { name: "Jan", entrada: 9000, saida: 8000 },
  { name: "Feb", entrada: 10000, saida: 9000 },
  { name: "Mar", entrada: 9500, saida: 8500 },
  { name: "Apr", entrada: 9700, saida: 8700 },
  { name: "May", entrada: 9900, saida: 9100 },
  { name: "Jun", entrada: 9200, saida: 8600 },
  { name: "Jul", entrada: 8100, saida: 7900 },
  { name: "Aug", entrada: 7600, saida: 7200 },
  { name: "Sep", entrada: 8300, saida: 7500 },
  { name: "Oct", entrada: 8800, saida: 8500 },
  { name: "Nov", entrada: 9400, saida: 9100 },
];

const dataMeta = [
  { name: "Achieved", value: 67, fill: verde },
  { name: "Remaining", value: 33, fill: cinzaClaro },
];

const dataConsumo = [
  { name: "Muito Ativo", value: 75, fill: verde },
  { name: "Ativo", value: 60, fill: amarelo },
  { name: "Inativo", value: 30, fill: cinzaClaro },
];

const dataInsumos = [
  { name: "Produto A", value: 1200000, percentage: "+8.2%" },
  { name: "Produto B", value: 800000, percentage: "+7%" },
  { name: "Produto C", value: 645000, percentage: "+2.5%" },
  { name: "Produto D", value: 590000, percentage: "-6.5%" },
  { name: "Produto E", value: 342000, percentage: "+1.7%" },
];

export default function DashboardPage() {
  const context = useAppContext()

  useEffect(() => {
    console.log(context.api.getToken())
  }, [])

  return (
    <div className="text-black p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Data Inicial</span>
            <button className="p-1">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 19h14M5 15h14" />
              </svg>
            </button>
          </div>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 px-2 py-1 rounded">→</button>
          <button className="p-1">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 4h10M5 11h14M5 19h14M5 15h14" />
            </svg>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-6">
        <nav className="flex space-x-6 text-sm font-medium text-gray-600">
          <a href="#" className="border-b-2 border-teal-500 text-black pb-2">Geral</a>
          <a href="#" className="relative pb-2 hover:text-black">
            Tarefas
            <span className="absolute -top-2 -right-4 inline-flex items-center justify-center text-xs text-white bg-teal-500 rounded-full w-4 h-4">?</span>
          </a>
          <a href="#" className="pb-2 hover:text-black">•••</a>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <h2 className="text-lg font-semibold mb-4">Desempenho</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dataDesempenho}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entrada" fill={verde} />
                <Bar dataKey="saida" fill={amarelo} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-4">Meta</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={dataMeta}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                >
                  {dataMeta.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center text-2xl font-semibold" style={{ color: verde }}>67%</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold mb-4 text-black">Consumo por Perfil</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataConsumo}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataConsumo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-4 text-sm text-black">
              {dataConsumo.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4 text-black">Insumos Recentes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {dataInsumos.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-teal-50 to-green-50 shadow-sm hover:shadow-md transition"
              >
                <div className="text-sm text-gray-600 mb-1">{item.name}</div>
                <div className="text-xl font-bold text-gray-800">
                  {item.value >= 1000000
                    ? (item.value / 1000000).toFixed(1) + "M"
                    : (item.value / 1000).toFixed(0) + "K"}
                </div>
                <div
                  className={`text-sm font-medium ${item.percentage.startsWith("-") ? "text-red-500" : "text-green-600"
                    }`}
                >
                  {item.percentage}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
