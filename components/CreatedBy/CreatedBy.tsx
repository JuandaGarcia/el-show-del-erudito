'use client'
import s from './CreatedBy.module.scss'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const CreatedBy = () => {
	const ref = useRef<HTMLAnchorElement | null>(null)
	const isInView = useInView(ref, { once: true })

	return (
		<a
			href="https://github.com/JuandaGarcia"
			target="_blank"
			rel="noopener noreferrer"
			className={s.created_by}
			ref={ref}
			data-animate={isInView}
		>
			<img
				src="/img/profile.jpg"
				alt="Foto de Juan David Garcia"
				width={50}
				height={50}
				className={s.created_by__img}
			/>
			<div className={s.created_by__content}>
				<p className={s.created_by__content__text}>Creado por</p>
				<p className={s.created_by__content__name}>@juandagarcia</p>
			</div>
		</a>
	)
}

export default CreatedBy
