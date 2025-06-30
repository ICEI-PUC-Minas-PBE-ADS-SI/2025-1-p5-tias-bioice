"use client"

import { ChangeEvent, useEffect, useState } from "react"
import Button from "@/components/basic/Button"
import Card from "@/components/basic/Card"
import MoneyInput from "@/components/basic/MoneyInput"

import Spinner from "@/components/basic/Spinner"
import { Insumo, Lançamento } from "@/components/Sheets/Entry"
import { useAppContext } from "@/contexts/AppContext"
import Collapse from "@/components/basic/Collapse"
import { CircleX } from "lucide-react"
import { IconButton } from "@/components/basic/RowFuncionario"

type Tabs = "Entradas" | "Saídas" | "Insumos" | "Relatórios"

const tabs: Tabs[] = ["Entradas", "Saídas", "Insumos", "Relatórios"]

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
		return totalReceipts - totalExpenses
	}

	useEffect(() => {
		if (loading) {
			context.api.getEntries({ pagina: 1, limite: 50, filtrarPorEntradas: true, filtrarPorDespesas: false }).then(r => {
				if (r.status == 200)
					setReceipts(r.data.data)
			}).finally(() => setLoading(false))
			context.api.getEntries({ pagina: 1, limite: 50, filtrarPorEntradas: false, filtrarPorDespesas: true }).then(r => {
				if (r.status == 200)
					setExpenses(r.data.data)
			}).finally(() => setLoading(false))
			context.api.getSupplies({ pagina: 1, limite: 50 }).then(r => {
				if (r.status == 200)
					setInputs(r.data.data)
			}).finally(() => setLoading(false))
		}
	}, [loading])

	useEffect(() => {
		switch (activeTab) {
			case "Entradas":
				context.api.getEntries({ pagina: 1, limite: 50, filtrarPorEntradas: true, filtrarPorDespesas: false }).then(r => {
					if (r.status == 200)
						setReceipts(r.data.data)
				}).finally(() => setLoading(false))

				break
			case "Saídas":
				context.api.getEntries({ pagina: 1, limite: 50, filtrarPorEntradas: false, filtrarPorDespesas: true }).then(r => {
					if (r.status == 200)
						setExpenses(r.data.data)
				}).finally(() => setLoading(false))

				break
			case "Insumos":
				context.api.getSupplies({ pagina: 1, limite: 50 }).then(r => {
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
							{activeTab == "Insumos"
								? <tr>
									<th className="p-4 text-left">Nome</th>
									<th className="p-4 text-left">Lote</th>
									<th className="p-4 text-left">Descrição</th>
									<th className="p-4 text-left">Data Compra</th>
									<th className="p-4 text-left">Data Vencimento</th>
								</tr>
								: <tr>
									<th className="p-4 text-left">Autor</th>
									<th className="p-4 text-left">Descrição</th>
									<th className="p-4 text-right">Valor</th>
									<th className="p-4 text-left">Data</th>
								</tr>}
						</thead>
						<tbody>
							{activeTab == "Entradas" && receipts.map(row => <Lançamento key={row.id} data={row} />)}
							{activeTab == "Saídas" && expenses.map(row => <Lançamento key={row.id} data={row} />)}
							{activeTab == "Insumos" && inputs.map(row => <Insumo key={row.id} data={row} />)}
						</tbody>
					</table>
				</div>
			)}

		{/* RELATÓRIO */}
		{activeTab === "Relatórios" && (
			<div className="bg-white p-6 rounded-2xl shadow-md">
				<h2 className="text-2xl font-bold text-gray-800 mb-4">Relatório Financeiro</h2>
				<div className="flex gap-4">
					<div className="bg-green-50 p-4 w-1/2 rounded-xl shadow-sm">
						<h3 className="text-sm text-green-800 font-medium">Total de Entradas</h3>
						<p className="text-2xl font-semibold text-green-700">
							R$ {receipts.reduce((sum, r) => sum + r.valor, 0).toFixed(2)}
						</p>
					</div>
					<div className="bg-red-50 p-4 w-1/2 rounded-xl shadow-sm">
						<h3 className="text-sm text-red-800 font-medium">Total de Saídas</h3>
						<p className="text-2xl font-semibold text-red-600">
							R$ {expenses.reduce((sum, r) => sum + r.valor, 0).toFixed(2)}
						</p>
					</div>
				</div>

				<div className="mt-4 bg-gray-50 p-4 rounded-xl shadow-inner text-right">
					<h4 className="text-lg font-medium text-gray-700">Saldo Final:</h4>
					<p className={`text-2xl font-bold ${saldoFinal() >= 0 ? "text-green-700" : "text-red-600"}`}>
						R$ {saldoFinal().toFixed(2)}
					</p>
				</div>

				{/* <div className="bg-white p-4 rounded-xl shadow-sm">
					<h3 className="text-lg font-medium text-gray-700 mb-2">Gráfico por Dia</h3>
					<ResponsiveContainer width="100%" height={300}>
						<BarChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="receipt" fill="#00C49F" name="Entradas" />
							<Bar dataKey="expense" fill="#FF7373" name="Saídas" />
							<Bar dataKey="input" fill="#FFBB28" name="Insumos" />
						</BarChart>
					</ResponsiveContainer>
				</div> */}
			</div>
		)}

		{add && <ModalAddEntry
			activeTab={activeTab}
			onClose={() => setAdd(false)}
			onFinish={(items: AddEntry, callback?: () => void) => {
				if (items.type != "input") {
					console.log(context.user)
					console.log(context.user.id)

					const newEntry: any = {
						isEntrada: items.type == "receipt",
						valor: items.value,
						descricao: items.description,
						usuarioId: context.user.id,
						itens: items.itens
					}

					context.api.addEntry(newEntry).then(r => {
						if (r.status == 201) {
							if (callback) callback()
							setAdd(false)
							setLoading(true)
						}
					}).catch(err => console.error(err))
						.finally(() => callback && callback())
				} else {
					const newEntry: Insumo = {
						id: receipts.length + expenses.length + inputs.length + 1,
						dataRegistro: new Date().toISOString(),
						dataValidade: new Date("+30 days").toISOString(),
						descricao: items.description,
						lote: "LOTE",
						nome: ""
					}

					setInputs(prev => [...prev, newEntry])
				}

			}}
		/>}
	</Card>
}

type AddEntry = {
	type: "receipt" | "expense" | "input"
	description: string
	value: number
	itens: Item[]
}

interface ModalAddEntry {
	onClose: () => void
	onFinish: (form: AddEntry, calback?: () => void) => void
	activeTab: Tabs
}


export interface Item {
	quantitativo: number
	produtoId: number
	insumoId: number
	name?: string
}

function ModalAddEntry({ onClose, onFinish, activeTab }: ModalAddEntry) {
	const [itens, setItens] = useState<Item[]>([])
	const [show, setShow] = useState(false)
	const [loading, setLoading] = useState(false)
	const [newItem, setNewItem] = useState({
		quantitativo: 0,
		produtoId: 1,
		insumoId: 1,
		name: ""
	})
	const [form, setForm] = useState<AddEntry>({
		type: activeTab == "Entradas" ? "receipt" : "expense",
		description: "",
		value: 0,
		itens: []
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

	useEffect(() => {
		if (itens) setForm(prev => ({ ...prev, itens: itens }))
	}, [itens])

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
			<div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					{filtrarTab()}
				</h2>
				<form className="space-y-3" onSubmit={e => e.preventDefault()}>
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
					<div className="text-gray-700">
						<label className="block text-sm font-medium mb-1">Itens</label>
						<Collapse in={!show}>
							<Button variant="empty" onClick={() => setShow(true)}>Adicionar Item</Button>
						</Collapse>
						<Collapse in={show}>
							<div className="px-1 flex gap-3 items-center">
								<IconButton color="error" onClick={() => setShow(false)}>
									<CircleX />
								</IconButton>
								<div>
									<input
										type="number"
										value={newItem.quantitativo}
										onChange={e => setNewItem(prev => ({ ...prev, quantitativo: Number(e.target.value) }))}
										placeholder="Informação adicional"
										className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
									/>
								</div>
								<div>
									<input
										type="text"
										value={newItem.name}
										onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
										placeholder="Informação adicional"
										className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 focus:outline-none"
									/>
								</div>

								<div className="mt-3">
									<Button color="secondary" variant="empty" onClick={() => setItens(prev => [...prev, {
										insumoId: newItem.insumoId,
										produtoId: newItem.produtoId,
										quantitativo: newItem.quantitativo
									}])}>
										Adicionar
									</Button>
								</div>
							</div>
						</Collapse>
						{itens.map((item, i) => <div key={i}>
							{item.quantitativo}x {newItem.name}
						</div>)}
					</div>
					<div className="flex justify-end gap-3 pt-4">
						<Button loading={loading} variant="border" onClick={onClose}>Cancelar</Button>
						<Button loading={loading} onClick={() => {
							setLoading(true)
							onFinish(form, () => setLoading(false))
						}}>Salvar</Button>
					</div>
				</form>
			</div >
		</div >
	)
}
