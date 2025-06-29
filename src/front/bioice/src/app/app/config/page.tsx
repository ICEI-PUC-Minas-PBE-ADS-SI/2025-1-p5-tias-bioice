"use client"

import Button from "@/components/basic/Button";

export default function ConfiguracoesPage() {
  return <div className="bg-white rounded-2xl shadow-lg">
    <div className="p-6 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
      </div>

      {/* Formulário */}
      <div className="mt-3">
        {/* Linha com 2 inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Nome</label>
            <input
              className="p-2 bg-gray-100 rounded text-sm"
              placeholder="Digite seu nome"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Sobrenome</label>
            <input
              className="p-2 bg-gray-100 rounded text-sm"
              placeholder="Digite seu sobrenome"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">E-mail</label>
            <input
              className="p-2 bg-gray-100 rounded text-sm"
              type="email"
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Telefone</label>
            <input
              className="p-2 bg-gray-100 rounded text-sm"
              type="tel"
              placeholder="(99) 99999-9999"
            />
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end mt-8">
          <Button color="secondary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  </div>
}