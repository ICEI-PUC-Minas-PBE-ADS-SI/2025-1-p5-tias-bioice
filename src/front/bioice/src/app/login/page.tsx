"use client";

import Button from "@/components/basic/Button"
import { useRouter } from "next/navigation"

import { ChangeEvent, useState } from "react"
import { InputText } from "@/components/basic/InputText";
import Collapse from "@/components/basic/Collapse";
import { useAppContext } from "@/contexts/AppContext";

export default function Login() {
  const router = useRouter()
  const context = useAppContext()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const [form, setForm] = useState({
    email: "",
    senha: ""
  })

  const errors: any = {
    401: "Credenciais inválidas",
    404: "Usuário não encontrado"
  }

  async function logar() {
    setOpen(false)
    setLoading(true)
    context.api.login(form).then(r => {
      if (r.status == 200) {
        context.api.setToken(r.data.accessToken)
        console.log(r)
        context.setUser({
          id: r.data.userId,
          email: form.email,
          name: r.data.username
        })

        router.push("/app/dashboard")
      } else throw errors[r.status] ?? "Não foi possível se conectar."
    }).catch(err => setTimeout(() => {
      setMsg(err)
      setOpen(true)
      setLoading(false)
    }, 1000))
  }

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="min-h-screen flex bg-[#FDF9F4]">
      <div className="w-1/2 flex items-center justify-center p-10 bg-[#FDF9F4]">
        <div className="max-w-sm text-center">
          {/* <Image
            width="100%"
            src="/logo.png"
            alt="Logo Biolce"
            className="w-48 mx-auto mb-4"
          /> */}
          <h1 className="text-5xl font-bold text-[#003D3D]">Biolce</h1>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Faça login na sua conta
          </h2>

          <div className="space-y-4">
            <InputText
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              onKeyDown={e => {
                console.log("apertou tecla")
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.getElementById("password")?.focus();
                }
              }}
            />

            <InputText
              id="password"
              type="password"
              name="senha"
              placeholder="Senha"
              value={form.senha}
              onChange={onChange}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  logar();
                }
              }}
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#37b4c3]" id="lembrar" />
              <label htmlFor="lembrar" className="text-sm text-gray-600">
                Mantenha-me logado
              </label>
            </div>

            <Button
              onClick={logar}
              loading={loading}
              fullwidth
            >
              Entrar
            </Button>
          </div>

          <div className="text-black">
            <Collapse in={open}>
              <div className="p-3 my-3 shadow-md rounded bg-red-200 text-center font-bold text-red-900">
                {msg ?? "Erro ao logar!"}
              </div>
            </Collapse>
          </div>

          {/* <div className="mt-6 space-y-3">
            <Button variant="border" fullwidth>
              <FcGoogle size={20} />
              Entrar com Google
            </Button>
            <Button variant="border" fullwidth>
              <FaApple size={20} />
              Entrar com Apple
            </Button>
          </div> */}

          <p className="text-sm text-gray-500 text-center mt-6">
            Ainda não possui uma conta?{" "}
            <a href="/register" className="text-[#2DB9C3] hover:underline">
              Cadastre-se aqui.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
