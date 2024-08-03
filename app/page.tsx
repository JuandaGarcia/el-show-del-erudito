'use client'
import s from './page.module.scss'
import Link from 'next/link'
import Logo from 'components/ui/Logo/Logo'
import Signature from 'components/Signature/Signature'
import CreatedBy from 'components/CreatedBy/CreatedBy'
import Button from 'components/ui/Button/Button'
import Modal from 'components/Modal/Modal'
import { useState } from 'react'

const Home = () => {
	const [openStartModal, setOpenStartModal] = useState(false)

	const toggleStartModal = () => setOpenStartModal(!openStartModal)

	return (
		<main className={s.home}>
			<section className={s.home__content}>
				<Link href="/" className={s.home__content__logo}>
					<Logo />
				</Link>
				<p className={s.home__content__text}>
					¡Prepárate para una experiencia de trivia única y emocionante,
					inspirada en el icónico “Quién quiere ser millonario”! En El Show del
					Erudito, pondrás a prueba tu conocimiento con preguntas diseñadas
					especialmente para ti, basadas en el tema de tu elección.
				</p>
				<Button className={s.home__content__button} onClick={toggleStartModal}>
					¡Jugar ahora!
				</Button>
				<div className={s.home__content__created_by}>
					<CreatedBy />
					<Signature />
				</div>
				<Modal open={openStartModal} handleClose={toggleStartModal} />
			</section>
			<img
				className={s.home__light}
				src="/img/light.svg"
				alt="Luz de la habitación"
			/>
			<img
				className={s.home__plant}
				src="/img/plant.svg"
				alt="Planta decorativa"
			/>
			<img
				className={s.home__room}
				src="/img/home.png"
				alt="Habitación del Erudito"
			/>
		</main>
	)
}

export default Home
