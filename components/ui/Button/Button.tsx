import { Bebas_Neue } from 'next/font/google'
import s from './Button.module.scss'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] })

const Button = ({
	children,
	className,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			className={`${s.button} ${bebasNeue.className} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}

export default Button
