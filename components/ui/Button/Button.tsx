import s from './Button.module.scss'
import { PropsWithChildren } from 'react'

const Button = ({ children }: PropsWithChildren) => {
	return <button className={s.button}>{children}</button>
}

export default Button
