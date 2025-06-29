"use client"

import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import Button from "@/components/basic/Button"
import Spinner from "@/components/basic/Spinner"
import { useAppContext } from "@/contexts/AppContext"

type FormState = {
  nome: string
  sobrenome: string
  email: string
  telefone: string
}

export default function ConfiguracoesPage() {
  const context = useAppContext()

  const [form, setForm] = useState<FormState>({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
  })

  const [loading, setLoading] = useState(true)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await context.api.updateUser(form)
      alert("Dados atualizados com sucesso!")
    } catch (error) {
      alert("Erro ao atualizar os dados.")
      console.error(error)
    }
  }

  useEffect(() => {
    context.api.getCurrentUser().then((res) => {
      if (res.status === 200) {
        const user = res.data
        setForm({
          nome: user.nome ?? "",
          sobrenome: user.sobrenome ?? "",
          email: user.email ?? "",
          telefone: user.telefone ?? "",
        })
      }
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="p-6 rounded-2xl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-3">
          {/* Linha com 2 inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Nome</label>
              <input
                className="p-2 bg-gray-100 rounded text-sm"
                placeholder="Digite seu nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Sobrenome</label>
              <input
                className="p-2 bg-gray-100 rounded text-sm"
                placeholder="Digite seu sobrenome"
                name="sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">E-mail</label>
              <input
                className="p-2 bg-gray-100 rounded text-sm"
                type="email"
                name="email"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Telefone</label>
              <input
                className="p-2 bg-gray-100 rounded text-sm"
                type="tel"
                name="telefone"
                placeholder="(99) 99999-9999"
                value={form.telefone}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="flex justify-end mt-8">
            <Button type="submit" color="secondary">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
