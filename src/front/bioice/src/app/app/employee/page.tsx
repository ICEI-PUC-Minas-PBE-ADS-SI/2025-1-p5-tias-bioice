"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import RowFuncionario, { RowFuncionarioData } from "@/components/basic/RowFuncionario";
import Button from "@/components/basic/Button";
import { useAppContext } from "@/contexts/AppContext";
import Spinner from "@/components/basic/Spinner";

export default function ListaUsuarios() {
  const context = useAppContext()

  const [data, setData] = useState<RowFuncionarioData[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<RowFuncionarioData>({
    id: null,
    username: "",
    email: "",
    nivelPermissao: "",
    password: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editing) {
      editEmployee(form.id)
      setIsModalOpen(false);
    } else {
      context.api.addEmployee(form).then(r => {
        if (r.status == 201) {
          setIsModalOpen(false);
          console.log("success")
        } else console.log(r.message)
      })
    }

    setForm({
      id: null,
      username: "",
      email: "",
      nivelPermissao: "",
      password: "",
    });
  };

  function editEmployeeStart(id: null | number) {
    setEditing(true)
    setIsModalOpen(true)
    data.forEach(user => user.id == id && setForm(user))
  }

  function editEmployee(id: null | number) {
    if (!id) return

    context.api.updateEmployee(form).then(r => {
      console.log(r)
      if (r.status == 200) {
        setLoading(true)
        console.log("sucesso")
      }
    })

    // const users = data.map(user => {
    //   if (user.id == id)
    //     return {
    //       ...form,
    //       id_usuario: id
    //     }
    //   return user
    // })

    // setData(users)
  }

  function deleteEmployee(id: null | number) {
    if (!id) return

    context.api.deleteEmployee(id).then(r => {
      if (r.status == 200) setLoading(true)
    }).catch(err => {
      console.error(err)
    })
    // const users = data.filter(user => {
    //   if (user.id != id) return user
    // })

    // setData(users)
  }

  useEffect(() => {
    if (loading) context.api.getEmployees({
      pagina: 1,
      limite: 10
    }).then(r => {
      if (r.status == 200) setData(r.data.data)
    }).finally(() => setLoading(false))
  }, [loading])

  return <div className="bg-white rounded-2xl shadow-lg">
    {loading
      ? <div className="p-6 flex justify-center">
        <Spinner />
      </div>
      : <>
        <div className="p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">Usuários</h1>
            <Button
              onClick={() => {
                setEditing(false)
                setIsModalOpen(true)
              }}
              color="secondary"
            >
              + Novo Usuário
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-green-50 text-green-700 uppercase text-xs font-semibold">
              <tr>
                <th className="p-4 w-20">ID</th>
                <th className="p-4 text-left w-40">Nome de usuário</th>
                <th className="p-4 text-left w-45">Email</th>
                <th className="p-4 text-left w-40">Nível</th>
                <th className="p-4 text-left w-40">Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <RowFuncionario
                  key={row.id}
                  row={row}
                  onEdit={() => editEmployeeStart(row.id)}
                  onDelete={() => deleteEmployee(row.id)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/20 backdrop-blur-sm">
            <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {editing
                  ? "Editando Funcionário"
                  : "Cadastrar Funcionário"}

              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Campo Nome de usuário */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome de usuário</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
                  />
                </div>

                {/* Campo Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
                  />
                </div>

                {/* Campo Senha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {editing
                      ? "Alterar Senha"
                      : "Senha"}

                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required={!editing}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
                  />
                </div>

                {/* Botões */}
                <div className="flex justify-end gap-2 pt-4">
                  <Button color="error" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" color="secondary">
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>}
  </div>
}
