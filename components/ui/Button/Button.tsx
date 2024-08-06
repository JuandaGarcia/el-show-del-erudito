import { bebasNeue } from 'fonts/bebasNeue'
import s from './Button.module.scss'
import { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	fullWidth?: boolean
	variant?: 'default' | 'purple'
}
const Button = ({
	children,
	className,
	fullWidth,
	variant,
	...props
}: Props) => {
	return (
		<button
			className={`${s.button} ${bebasNeue.className} ${className} ${
				fullWidth ? s.full_width : ''
			} ${variant === 'purple' ? s.purple : ''}`}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
