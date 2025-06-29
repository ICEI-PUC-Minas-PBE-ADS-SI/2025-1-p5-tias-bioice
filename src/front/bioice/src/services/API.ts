export default class API {
	// baseUrl: string | null = "https://two025-1-p5-tias-bioice.onrender.com"
	baseUrl: string | null = "http://192.168.1.20:27116"
	token: string | null = null

	async genericFetch(uri: string, method: string = "GET", body: Record<string, number | string> | null = null) {
		const config: RequestInit = {
			method: method
		}
		if (method == "POST" && body)
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

	setToken(token: string) {
		this.token = token
	}

	genericGET(url: string) {
		return this.genericFetch(url, "GET", null)
	}

	genericPOST(url: string, body: Record<string, number | string>) {
		return this.genericFetch(url, "POST", body)
	}

	genericPUT(url: string, body: Record<string, number | string>) {
		return this.genericFetch(url, "PUT", body)
	}

	genericPATCH(url: string, body: Record<string, number | string>) {
		return this.genericFetch(url, "PATCH", body)
	}

	genericDELETE(url: string) {
		return this.genericFetch(url, "DELETE", null)
	}

	login(credentials: { email: string, senha: string }) {
		return this.genericPOST("/usuario/auth", credentials)
	}

	signup(credentials: { name: string, email: string, senha: string }) {
		return this.genericPOST("/usuario", { ...credentials, nivelPermissao: "admin" })
	}
}