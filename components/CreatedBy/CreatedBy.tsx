'use client'
import s from './CreatedBy.module.scss'
const CreatedBy = () => {
	return (
		<a
			href="https://github.com/JuandaGarcia"
			target="_blank"
			rel="noopener noreferrer"
			className={s.created_by}
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
