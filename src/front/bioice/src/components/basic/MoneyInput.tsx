import { NumericFormat } from "react-number-format"

interface MoneyInputProps {
	name: string
	value: number
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function MoneyInput({ name, value, onChange }: MoneyInputProps) {
	return (
		<NumericFormat
			name={name}
			value={value}
			thousandSeparator="."
			decimalSeparator=","
			prefix="R$ "
			allowNegative={false}
			decimalScale={2}
			fixedDecimalScale={true}
			className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-600"
			onValueChange={(values) => {
				const fakeEvent = {
					target: {
						name,
						value: values.floatValue || 0,
					}
				} as unknown as React.ChangeEvent<HTMLInputElement>
				if (onChange) onChange(fakeEvent)
			}}
		/>
	)
}
