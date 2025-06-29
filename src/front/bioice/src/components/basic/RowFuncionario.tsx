import { Edit, Trash } from "lucide-react";
import React from "react";

export interface RowFuncionarioData {
  id: null | number
  username: string
  email: string
  nivel_permissao: string
  password: string
}

interface Props {
  row: RowFuncionarioData;
  onEdit: (id: number | null) => void
  onDelete: (id: number | null) => void
}

export default function RowFuncionario({ row, onEdit, onDelete }: Props) {
  return (
    <tr className="transition-colors">
      <td className="p-4 text-center font-bold">{row.id}</td>
      <td className="p-4">{row.username}</td>
      <td className="p-4">{row.email}</td>
      <td className="p-4">{row.nivel_permissao}</td>
      <td className="p-4 flex gap-2">
        <IconButton onClick={onEdit}>
          <Edit />
        </IconButton>
        <IconButton onClick={onDelete} color="red">
          <Trash />
        </IconButton>
      </td>
    </tr>
  );
}

function IconButton(props: any) {

  function colorFilter(color: string) {
    switch (color) {
      case "red":
        return " text-red-500"
      default:
        return ""
    }
  }

  return <button
    onClick={props.onClick}
    className={"cursor-pointer rounded-full p-1" + colorFilter(props.color)}
  >
    {props.children}
  </button>
}
