import { forwardRef, InputHTMLAttributes } from 'react'
import s from './Input.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	fullWidth?: boolean
	error?: string
}
const Input = forwardRef<HTMLInputElement, Props>(
	({ className, fullWidth, error, ...props }, ref) => {
		return (
			<input
				className={`${s.input} ${className} ${fullWidth ? s.full_width : ''} ${
					error ? s.error : ''
				}`}
				type="text"
				{...props}
				ref={ref}
			/>
		)
	}
)

Input.displayName = 'Input'

export default Input
