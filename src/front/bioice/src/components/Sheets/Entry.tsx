"use client"

type Status = "Ativo" | "Inativo";

export interface RowData {
  id: number
  author: string
  role: string
  value: number
  description: string
  date: Date
  titles: string[]
  status: Status
}

export default function Entry({ row }: { row: RowData }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition-colors">
      <td className="p-4"><input type="checkbox" /></td>
      <td className="p-4">
        <div className="flex flex-col">
          <span className="font-semibold">{row.author}</span>
          <span className="text-xs text-gray-400">{row.role}</span>
        </div>
      </td>
      <td className="p-4">
        {row.description}
      </td>
      <td className="p-4">
        {row.value}
      </td>
      <td className="p-4">
        {row.date.toISOString()}
      </td>
      <td className="p-4">
        {row.titles.join(", ")}
      </td>

      <td className="p-4">
        {row.status === "Ativo" ? (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
            Ativo
          </span>
        ) : (
          <span className="text-xs bg-gray-300/30 text-gray-500 px-2 py-1 rounded-full font-semibold">
            Inativo
          </span>
        )}
      </td>
    </tr>
  );
}