import s from './CreatedBy.module.scss'
import Signature from './Signature/Signature'

type Props = {
	type?: 'home' | 'win'
}
const CreatedBy = ({ type }: Props) => {
	return (
		<div className={s.created_by}>
			<a
				href="https://github.com/JuandaGarcia"
				target="_blank"
				rel="noopener noreferrer"
				className={s.created_by__user}
			>
				<img
					src="/img/profile.jpg"
					alt="Foto de Juan David Garcia"
					width={50}
					height={50}
					className={s.created_by__user__img}
				/>
				<div className={s.created_by__user__content}>
					<p className={s.created_by__user__content__text}>Creado por</p>
					<p className={s.created_by__user__content__name}>@juandagarcia</p>
				</div>
			</a>
			<div
				className={`${s.created_by__signature} ${
					type === 'home' ? s.left : ''
				}`}
			>
				<Signature />
			</div>
		</div>
	)
}

export default CreatedBy
