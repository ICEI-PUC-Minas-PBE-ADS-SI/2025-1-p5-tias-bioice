"use client"

import React, { useRef, useEffect, useState } from "react"

type CollapseProps = {
	in: boolean
	children: React.ReactNode
	duration?: number
	style?: React.CSSProperties
};

export default function Collapse({ in: open, children, duration = 200, style = {} }: CollapseProps) {
	const ref = useRef<HTMLDivElement>(null)
	const [maxHeight, setMaxHeight] = useState<string>(open ? "none" : "0px")
	const timeoutRef = useRef<number | null>(null)

	useEffect(() => {
		const el = ref.current
		if (!el) return
		if (open) {
			setMaxHeight(el.scrollHeight + "px")

			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		} else {
			const currentHeight =
				maxHeight === "none" ? el.scrollHeight + "px" : maxHeight
			setMaxHeight(currentHeight)
			// Next frame, animate to 0px
			requestAnimationFrame(() => setMaxHeight("0px"))

			// Clear timeout so we never set 'none' while closing
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
		}
	}, [open, duration, children])

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	return <div>
		<div
			ref={ref}
			style={{
				overflow: "hidden",
				transition: `max-height ${duration}ms`,
				maxHeight: maxHeight,
				pointerEvents: open ? "auto" : "none",
				...style,
			}}
			aria-hidden={!open}
		>
			{children}
		</div>
	</div>
}