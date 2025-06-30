import { Item } from "@/app/app/entries/page"
import { RowFuncionarioData } from "@/components/basic/RowFuncionario"

export default class API {
	baseUrl: string | null = "https://two025-1-p5-tias-bioice.onrender.com"

	token: string | null = null

	async genericFetch(uri: string, method: string = "GET", body: Record<string, number | string | boolean | object[]> | null = null) {
		const config: RequestInit = {
			method: method
		}
		if (["POST", "PUT"].includes(method) && body)
			config.body = JSON.stringify(body)

		config.headers = new Headers()
		config.headers.append("Content-Type", "application/json")
		config.redirect = "follow"
		config.signal = AbortSignal.timeout(20000)

		if (this.token)
			config.headers.append("Authorization", this.token)
		return fetch(this.baseUrl + uri, config).then(r => r.json()).catch(err => {
			console.error(err)
			return err
		})
	}

	toQueryString(params: Record<string, string | number | boolean>): string {
		const searchParams = new URLSearchParams();

		for (const [key, value] of Object.entries(params)) {
			searchParams.append(key, value.toString());
		}

		return "?" + searchParams.toString();
	}

	setToken(token: string) {
		this.token = token
	}

	getToken() {
		return this.token
	}

	genericGET(url: string) {
		return this.genericFetch(url, "GET", null)
	}

	genericPOST(url: string, body: Record<string, number | string | boolean | object[]>) {
		return this.genericFetch(url, "POST", body)
	}

	genericPUT(url: string, body: Record<string, number | string | boolean | object[]>) {
		return this.genericFetch(url, "PUT", body)
	}

	genericPATCH(url: string, body: Record<string, number | string | boolean | object[]>) {
		return this.genericFetch(url, "PATCH", body)
	}

	genericDELETE(url: string) {
		return this.genericFetch(url, "DELETE", null)
	}

	///////////////////////////////////////////////////////////////////////////

	login(credentials: { email: string, senha: string }) {
		return this.genericPOST("/usuario/auth", credentials)
	}

	signup(credentials: { name: string, email: string, senha: string }) {
		return this.genericPOST("/usuario", { ...credentials, nivelPermissao: "admin" })
	}

	getEmployees(query?: Record<string, string | number>) {
		let q = ""
		if (query) q = this.toQueryString(query)
		return this.genericGET("/usuario" + q)
	}

	addEmployee(data: RowFuncionarioData) {
		return this.genericPOST("/usuario", {
			name: data.username,
			email: data.email,
			senha: data.password,
			nivelPermissao: "editor",
		})
	}

	deleteEmployee(id: string | number) {
		return this.genericDELETE("/usuario/" + id)
	}

	updateEmployee(data: RowFuncionarioData) {
		return this.genericPUT("/usuario/", {
			id: Number(data.id),
			name: data.username,
			email: data.email,
			senha: data.password,
			nivelPermissao: data.nivelPermissao,
		})
	}

	// ENTRADAS E SAÍDAS
	getEntries(query?: Record<string, string | number | boolean>) {
		let q = ""
		if (query) q = this.toQueryString(query)

		return this.genericGET("/dados-financeiros" + q)
	}

	addEntry(entry: Entry) {
		return this.genericPOST("/dados-financeiros", {
			"isEntrada": entry.isEntrada,
			"valor": entry.valor,
			"descricao": entry.descricao,
			"usuarioId": entry.usuarioId,
			"itens": entry.itens
		})
	}

	getSupplies(query?: Record<string, string | number | boolean>) {
		let q = ""
		if (query) q = this.toQueryString(query)

		return this.genericGET("/insumo" + q)
	}

	//COFIGURAÇÃO
	getCurrentUser() {
		return this.genericGET("/usuario/me")
	}

	updateUser(data: { nome: string, sobrenome: string, email: string, telefone: string }) {
		return this.genericPUT("/usuario/me", data)
	}
}

export interface Entry {
	isEntrada: boolean
	valor: number
	descricao: string
	usuarioId: number
	itens: Item[]
}