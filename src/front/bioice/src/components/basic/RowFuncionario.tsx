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
        <IconButton onClick={() => onDelete(row.id)} color="error">
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

export function IconButton(props: IconButton) {
  function colorFilter(color: string | undefined) {
    switch (color) {
      case "primary":
        return " text-red-500 hover:bg-[#c7e9ec] text-[#37b4c3]" 
      case "secondary":
        return " text-red-500 hover:bg-[#bce9d4] text-[#37c382]" 
      case "error":
        return " text-red-500 hover:bg-[#ebc2c9] text-[#c3374e]" 
      default:
        return ""
    }
  }

  return <button
    onClick={props.onClick}
    className={"cursor-pointer border-transparent rounded-full p-1" + colorFilter(props.color)}
  >
    {props.children}
  </button>
}
