import { Edit, Trash } from "lucide-react";
import React, { MouseEventHandler } from "react";

export interface RowFuncionarioData {
  id: null | number
  username: string
  email: string
  nivelPermissao: string
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
      <td className="p-4">{row.nivelPermissao}</td>
      <td className="p-4 flex gap-2">
        <IconButton onClick={() => onEdit(row.id)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(row.id)} color="red">
          <Trash />
        </IconButton>
      </td>
    </tr>
  );
}

interface IconButton {
  children?: React.ReactNode
  color?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

function IconButton(props: IconButton) {

  function colorFilter(color: string | undefined) {
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
