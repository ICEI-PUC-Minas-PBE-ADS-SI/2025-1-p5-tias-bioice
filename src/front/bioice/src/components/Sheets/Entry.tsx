"use client"

export interface Lançamento {
  id: number
  usuario: {
    username: string
    nivelPermissao: string
  }
  valor: number
  descricao: string
  dataOperacao: string
}


export function Lançamento({ data }: { data: Lançamento }) {
  const formattedBRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(data.valor)
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="p-4">
        <div className="flex flex-col">
          <span className="font-semibold">{data.usuario.username}</span>
          <span className="text-xs text-gray-400">{data.usuario.nivelPermissao}</span>
        </div>
      </td>
      <td className="p-4">
        {data.descricao}
      </td>
      <td className="p-4 text-right">
        {formattedBRL}
      </td>
      <td className="p-4">
        {data.dataOperacao}
      </td>
    </tr>
  );
}

export interface Insumo {
  id: number
  nome: string
  descricao: string
  dataRegistro: string
  dataValidade: string
  lote: string
}

export function Insumo({ data }: { data: Insumo }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="p-4">
        {data.nome}
      </td>
      <td className="p-4">
        {data.lote}
      </td>
      <td className="p-4">
        {data.descricao}
      </td>
      <td className="p-4">
        {data.dataRegistro}
      </td>
      <td className="p-4">
        {data.dataValidade}
      </td>
    </tr>
  );
}