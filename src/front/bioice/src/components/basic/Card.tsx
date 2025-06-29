import { ReactNode } from "react"

export default function Card(props: { children: ReactNode }) {
	return <div className="bg-white rounded-2xl shadow-lg">
		{props.children}
	</div>
}