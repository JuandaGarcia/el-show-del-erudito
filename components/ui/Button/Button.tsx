import { bebasNeue } from 'fonts/bebasNeue'
import s from './Button.module.scss'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean
}
const Button = ({ children, className, fullWidth, ...props }: Props) => {
	return (
		<button
			className={`${s.button} ${bebasNeue.className} ${className} ${
				fullWidth ? s.full_width : ''
			}`}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
