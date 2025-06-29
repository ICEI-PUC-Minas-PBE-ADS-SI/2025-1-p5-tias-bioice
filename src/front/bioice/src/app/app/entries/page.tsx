"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Button from "@/components/basic/Button"
import Card from "@/components/basic/Card"
import MoneyInput from "@/components/basic/MoneyInput"

import { useAppContext } from "@/contexts/AppContext"
import Spinner from "@/components/basic/Spinner"
import { Insumo, Lançamento } from "@/components/Sheets/Entry"

type Tabs = "Entradas" | "Saídas" | "Insumos" | "Relatórios" | "Admin"

const tabs: Tabs[] = ["Entradas", "Saídas", "Insumos", "Relatórios", "Admin"]

export default function Lancamentos() {
	const context = useAppContext()

	const [activeTab, setActiveTab] = useState<Tabs>("Entradas")
	const [receipts, setReceipts] = useState<Lançamento[]>([])
	const [expenses, setExpenses] = useState<Lançamento[]>([])
	const [inputs, setInputs] = useState<Insumo[]>([])

	const [add, setAdd] = useState(false)
	const [loading, setLoading] = useState(true)

	const saldoFinal = () => {
		const totalReceipts = receipts.reduce((sum, r) => sum + r.valor, 0)
		const totalExpenses = expenses.reduce((sum, r) => sum + r.valor, 0)
		const totalInputs = inputs.reduce((sum, r) => sum + r.valor, 0)
		return totalReceipts - totalExpenses - totalInputs
	}

	// const allData = [...receipts, ...expenses, ...inputs]
	// const grouped = allData.reduce<Record<string, { receipt: number, expense: number, input: number }>>((acc, item) => {
	// 	const dateKey = dayjs(item.dataOperacao).format("DD/MM")

	// 	if (!acc[dateKey]) {
	// 		acc[dateKey] = { receipt: 0, expense: 0, input: 0 }
	// 	}

	// 	if (receipts.includes(item)) acc[dateKey].receipt += item.valor
	// 	else if (expenses.includes(item)) acc[dateKey].expense += item.valor
	// 	else if (inputs.includes(item)) acc[dateKey].input += item.valor

	// 	return acc
	// }, {})

	// const chartData = Object.entries(grouped).map(([date, values]) => ({
	// 	name: date,
	// 	...values,
	// }))

	useEffect(() => {
		setLoading(true)
		switch (activeTab) {
			case "Entradas":
				context.api.getEntries({ pagina: 1, limite: 50, entradas: true }).then(r => {
					if (r.status == 200)
						setReceipts(r.data.data)
				}).finally(() => setLoading(false))

				break
			case "Saídas":
				context.api.getEntries({ pagina: 1, limite: 50, entradas: false }).then(r => {
					if (r.status == 200)
						setExpenses(r.data.data)
				}).finally(() => setLoading(false))

				break
			case "Insumos":
				context.api.getSupplies({ pagina: 1, limite: 50, entradas: false }).then(r => {
					if (r.status == 200)
						setInputs(r.data.data)
				}).finally(() => setLoading(false))

				break
			default:
				setLoading(false)
		}
	}, [activeTab])

	return <Card>
		<div className="flex items-center justify-between p-6 mb-6">
			<h1 className="text-3xl font-bold text-gray-800">Lançamentos</h1>
			{["Entradas", "Saídas", "Insumos"].includes(activeTab) && <Button color="secondary" onClick={() => setAdd(true)}>
				+ Adicionar
			</Button>}
		</div>

		<div className="flex gap-4 border-b border-gray-200">
			{tabs.map((tab) => (
				<button
					key={tab}
					onClick={() => setActiveTab(tab)}
					className={`relative pb-2 px-2 text-sm font-medium transition-all duration-150 border-b-2 ${activeTab === tab
						? "text-green-700 border-green-700"
						: "text-gray-500 hover:text-green-600 border-transparent"}`}
				>
					{tab}
					{tab === "Entradas" && <span className="ml-1 text-xs bg-gray-200 px-1 rounded">{receipts.length}</span>}
					{tab === "Insumos" && <span className="ml-1 text-xs bg-gray-200 px-1 rounded">{inputs.length}</span>}
				</button>
			))}
		</div>

		{/* TABELA */}
		{loading
			? <div className="flex justify-center p-3">
				<Spinner />
			</div>
			: ["Entradas", "Saídas", "Insumos"].includes(activeTab) && (
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm text-gray-700">
						<thead className="bg-green-50 text-green-700 uppercase text-xs font-semibold">
							<tr>
								<th className="p-4 text-left">Autor</th>
								<th className="p-4 text-left">Descrição</th>
								<th className="p-4 text-right">Valor</th>
								<th className="p-4 text-left">Data</th>
							</tr>
						</thead>
						<tbody>
							{/* <Collapse in={activeTab == "Entradas"}> */}
							{activeTab == "Entradas" && receipts.map(row => <Lançamento key={row.id} data={row} />)}
							{activeTab == "Saídas" && expenses.map(row => <Lançamento key={row.id} data={row} />)}
							{activeTab == "Insumos" && inputs.map(row => <Insumo key={row.id} data={row} />)}
							{/* </Collapse> */}
							{/* <Collapse in={activeTab == "Saídas"}>
									{expenses.map(row => <RowLancamento key={row.id} row={row} />)}
								</Collapse> */}
						</tbody>
					</table>
				</div>
			)}

		{/* RELATÓRIO */}
		{activeTab === "Relatórios" && (
			<div className="bg-white p-6 rounded-2xl shadow-md">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">Relatório Financeiro</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="bg-green-50 p-4 rounded-xl shadow-sm">
						<h3 className="text-sm text-green-800 font-medium">Total de Entradas</h3>
						<p className="text-2xl font-semibold text-green-700">
							R$ {receipts.reduce((sum, r) => sum + r.valor, 0).toFixed(2)}
						</p>
					</div>
					<div className="bg-red-50 p-4 rounded-xl shadow-sm">
						<h3 className="text-sm text-red-800 font-medium">Total de Saídas</h3>
						<p className="text-2xl font-semibold text-red-600">
							R$ {expenses.reduce((sum, r) => sum + r.valor, 0).toFixed(2)}
						</p>
					</div>
					<div className="bg-yellow-50 p-4 rounded-xl shadow-sm">
						<h3 className="text-sm text-yellow-800 font-medium">Total de Insumos</h3>
						<p className="text-2xl font-semibold text-yellow-600">
							R$ {inputs.reduce((sum, r) => sum + r.valor, 0).toFixed(2)}
						</p>
					</div>
				</div>

				<div className="mt-4 bg-gray-50 p-4 rounded-xl shadow-inner text-right">
					<h4 className="text-lg font-medium text-gray-700">Saldo Final:</h4>
					<p className={`text-2xl font-bold ${saldoFinal() >= 0 ? "text-green-700" : "text-red-600"}`}>
						R$ {saldoFinal().toFixed(2)}
					</p>
				</div>

				<div className="bg-white p-4 rounded-xl shadow-sm">
					<h3 className="text-lg font-medium text-gray-700 mb-2">Gráfico por Dia</h3>
					{/* <ResponsiveContainer width="100%" height={300}>
						<BarChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="receipt" fill="#00C49F" name="Entradas" />
							<Bar dataKey="expense" fill="#FF7373" name="Saídas" />
							<Bar dataKey="input" fill="#FFBB28" name="Insumos" />
						</BarChart>
					</ResponsiveContainer> */}
				</div>
			</div>
		)}

		{/* ADMIN */}
		{activeTab === "Admin" && (
			<div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
				<h2 className="text-2xl font-bold text-gray-800">Administração</h2>
				<p className="text-gray-600">Área destinada para configurações administrativas, permissões e controle do sistema.</p>
				<div className="flex gap-4">
					<Button>Gerenciar Usuários</Button>
					<Button variant="border">Exportar Dados</Button>
				</div>
			</div>
		)}

		{/* MODAL DE ADIÇÃO */}
		{add && (
			<ModalAddEntry
				activeTab={activeTab}
				onClose={() => setAdd(false)}
				onFinish={(items: AddEntry) => {
					if (items.type != "input") {
						const newEntry: Lançamento = {
							id: receipts.length + expenses.length + inputs.length + 1,
							usuario: {
								username: context.user.name,
								nivelPermissao: "admin"
							},
							dataOperacao: new Date().toISOString(),
							descricao: items.description,
							valor: items.value,
						}

						if (items.type === "receipt") setReceipts(prev => [...prev, newEntry])
						else setExpenses(prev => [...prev, newEntry])
					} else {
						const newEntry: Insumo = {
							id: receipts.length + expenses.length + inputs.length + 1,
							dataRegistro: new Date().toISOString(),
							dataValidade: new Date("+30 days").toISOString(),
							descricao: items.description,
							valor: items.value,
							lote: "LOTE",
							nome: ""
						}

						setInputs(prev => [...prev, newEntry])
					}

					setAdd(false)
				}}
			/>
		)}
	</Card>
}

type AddEntry = {
	type: "receipt" | "expense" | "input"
	description: string
	value: number
	extra: string
}

interface ModalAddEntry {
	onClose: () => void
	onFinish: (form: AddEntry) => void
	activeTab: Tabs
}

function ModalAddEntry({ onClose, onFinish, activeTab }: ModalAddEntry) {
	const [form, setForm] = useState<AddEntry>({
		type: "receipt",
		description: "",
		value: 0,
		extra: ""
	})

	const handleChange = (e?: ChangeEvent<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>) => {
		if (e) {
			const { name, value } = e.target
			setForm(prev => ({
				...prev,
				[name]: name === "value" ? parseFloat(value) : value
			}))
		}
	}

	function filtrarTab() {
		switch (activeTab) {
			case "Entradas":
				return "Adicionar nova entrada"
			case "Saídas":
				return "Adicionar nova saída"
			case "Insumos":
				return "Adicionar novo insumo"
			default:
				return "Adicionar..."

		}
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
			<div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					{filtrarTab()}
				</h2>
				<form className="space-y-5" onSubmit={e => e.preventDefault()}>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
						<textarea
							name="description"
							value={form.description}
							onChange={handleChange}
							required
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
						<MoneyInput
							name="value"
							value={form.value}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Extra</label>
						<input
							name="extra"
							type="text"
							value={form.extra}
							onChange={handleChange}
							placeholder="Informação adicional"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
						/>
					</div>
					<div className="flex justify-end gap-3 pt-4">
						<Button variant="border" onClick={onClose}>Cancelar</Button>
						<Button onClick={() => onFinish(form)}>Salvar</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
