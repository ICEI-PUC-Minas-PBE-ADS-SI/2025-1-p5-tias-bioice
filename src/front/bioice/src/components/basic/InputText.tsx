import { ChangeEventHandler } from "react"
import Spinner from "./Spinner"

interface InputText {
	id?: string
	name?: string
	placeholder?: string
	type?: string
	value?: string | number
	onChange?: ChangeEventHandler<HTMLInputElement>
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	loading?: boolean
}

export function InputText(props: InputText) {
	return <div className="relative">
		{props.loading && <div className="absolute w-full h-full bg-[#ffffffcc]">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<Spinner />
			</div>
		</div>}

		<input
			id={props.id}
			name={props.name}
			type={props.type}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
			onKeyDown={props.onKeyDown}
			className="w-full px-4 py-3 border border-gray-300 text-black rounded bg-gray-50 outline-[#37b4c3] transition-all duration-200 "
		/>
	</div>
}