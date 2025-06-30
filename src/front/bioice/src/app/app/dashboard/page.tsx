"use client";

import Card from "@/components/basic/Card";
import { useAppContext } from "@/contexts/AppContext";
import {useEffect, useState} from "react";
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
import Spinner from "@/components/basic/Spinner";

const verde = "#00C49F";
const amarelo = "#FFBB28";
const cinzaClaro = "#E0E0E0";

const dataConsumo =[
  { name: "Usados", value: 180, fill: "#00C49F" },
  { name: "Disponíveis", value: 80, fill: "#FFBB28" },
  { name: "Vencidos", value: 10, fill: "#E0E0E0" }
]

const dataInsumos = [
  { name: "Essência de Baunilha", value: 15.40, percentage: "+2,1%" },
  { name: "Açucar Refinado", value: 15.49, percentage: "+5%" },
  { name: "Creme de Leite (1Kg)", value: 17.89, percentage: "+2.5%" },
  { name: "Leite Integral (Caixa 12u)", value: 107.97, percentage: "-0.5%" },
  { name: "Granulado de Chocolate", value: 13.33, percentage: "+1.7%" },
];

export default function DashboardPage() {
  const context = useAppContext()
    const [loading, setLoading] = useState(true);
    const [dataDesempenho, setDataDesempenho] = useState([]);
    const [dataMeta, setDataMeta] = useState([]);
    const [metaMensal, setMetaMensal] = useState(10000);
    const [lucroMensal, setLucroMensal] = useState(0);

  useEffect(() => {
    console.log(context.api.getToken());

    context.api.getRelatorio().then((r) => {
      console.log(r);

      function atualizarDashBoard(): void {
        const relatorioData = r.data.map((it) => ({
          name: it.mes > 10 ? it.mes + "/" + it.ano : `0${it.mes}/${it.ano}`,
          totalEntradas: it.totalEntradas,
          totalSaidas: it.totalSaidas,
          totalMensal: it.totalMensal,
        }));

        setDataDesempenho(relatorioData);
      }

      function atualizarMetaMensal() {
        const meta = 10000;
        setMetaMensal(meta);

        const ultimo = r.data[r.data.length - 1];
        if (ultimo) {
          const lucro = ultimo.totalEntradas - ultimo.totalSaidas;

          setLucroMensal(lucro);

          const percentual = Math.min((lucro / meta) * 100, 100);
          setDataMeta([
            {name: "Archieved", value: percentual, fill: verde},
            {name: "Remaining", value: 100 - percentual, fill: cinzaClaro},
          ]);
        }
      }

      if (r.status === 200) {
        console.log("sucesso");
        atualizarDashBoard();
        atualizarMetaMensal();

      }
    }).finally(() => {
      setLoading(false);
    });

  }, []);


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
            <div className="p-9">
                {loading
                    ? <div className="flex justify-center">
                        <Spinner/>
                    </div>
                    : <div> <h2 className="text-lg font-semibold mb-4">Dados financeiros</h2>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={dataDesempenho}>
                                <XAxis dataKey="name"/>
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="totalEntradas" fill={verde} />
                                <Bar dataKey="totalSaidas" fill={amarelo} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div> }
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex flex-col p-6 items-center justify-center">
            <h2 className="text-lg font-semibold mb-4">Meta Mensal</h2>
            <h3 className="text-lg font-semibold mb-4">
              {lucroMensal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })} / {metaMensal.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
            </h3>
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
            <div className="text-center text-2xl font-semibold" style={{ color: verde }}>
              {dataMeta.length > 0 ? `${dataMeta[0].value.toFixed(0)}%` : "0%"}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex flex-col p-6 items-center justify-center">
            <h2 className="text-lg font-semibold mb-4 text-black">Estatísticas do estoque</h2>
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
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">Insumos Recentes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {dataInsumos.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-gray-200 bg-gradient-to-br from-teal-50 to-green-50 shadow-sm hover:shadow-md transition"
                >
                  <div className="text-sm text-gray-600 mb-1">{item.name}</div>
                  <div className="text-xl font-bold text-gray-800">
                    {`${item.value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}`}
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
          </div>
        </Card>
      </div>
    </div>
  );
}
