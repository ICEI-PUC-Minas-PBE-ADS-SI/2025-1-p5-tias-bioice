"use client"

import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import Button from "@/components/basic/Button"
import { useAppContext } from "@/contexts/AppContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { InputText } from "@/components/basic/InputText"

export default function Cadastro() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: ""
  })

  const router = useRouter();

  const context = useAppContext()

  async function cadastrar() {
    context.api.signup({
      email: form.email,
      name: form.name + " " + form.surname,
      senha: form.password
    }).then(r => {
      if (r.status == 201) {
        context.setUser({
          id: r.data.id,
          email: r.data.email,
          name: r.data.username
        })
        router.push("/app/dashboard")
      } else {
        console.error("erro")
      }
    }).catch(r => {
      console.error("Problema na requisição")
      console.error(r)
    })
  }

  return (
    <div className="min-h-screen flex bg-[#FDF9F4]">
      {/* Lado Esquerdo - Logo e nome */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-[#FDF9F4]">
        <div className="max-w-sm text-center">
          <h1 className="text-5xl font-bold text-[#003D3D]">Biolce</h1>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Cadastre-se
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4">
              <InputText
                type="text"
                placeholder="Primeiro nome"
                value={form.name}
                onChange={e => setForm(v => ({ ...v, name: e.target.value }))}
              />
              <InputText
                type="text"
                placeholder="Segundo nome"
                value={form.surname}
                onChange={e => setForm(v => ({ ...v, surname: e.target.value }))}
              />
            </div>

            <InputText
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm(v => ({ ...v, email: e.target.value }))}
            />

            <InputText
              type="password"
              placeholder="Senha"
              value={form.password}
              onChange={e => setForm(v => ({ ...v, password: e.target.value }))}
            />

            <div className="flex gap-3">
              <InputText type="checkbox" id="termos" />
              <label htmlFor="termos" className="text-sm text-gray-600">
                Aceito os termos de uso
              </label>
            </div>

            <Button onClick={() => cadastrar()} fullwidth>
              Cadastrar
            </Button>
          </div>

          {/* Botões de login social */}
          <div className="mt-6 space-y-3">
            <Button variant="border" fullwidth>
              <FcGoogle size={20} />
              Cadastrar com Google
            </Button>
            <Button variant="border" fullwidth>
              <FaApple size={20} />
              Cadastrar com Apple
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">
            Já possui uma conta?{" "}
            <a href="/login" className="text-[#2DB9C3] hover:underline">
              Clique aqui.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}